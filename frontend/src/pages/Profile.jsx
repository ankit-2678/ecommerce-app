import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

function Profile() {

  const { backendUrl, token, navigate, setToken } = useContext(ShopContext)

  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: "", address: "", phone: "" })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const [showImage, setShowImage] = useState(false)

  

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token }
      })

      if (res.data.success) {
        setUser(res.data.user)
        setForm({
          name: res.data.user.name,
          address: res.data.user.address,
          phone: res.data.user.phone
        })
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (token) fetchProfile()
  }, [token])

  const handleUpdate = async () => {
    const trimmedName = form.name.trim()
    const trimmedAddress = form.address.trim()
    const trimmedPhone = form.phone.trim()

    if (!trimmedName || trimmedName.length < 3) {
      toast.error('Name is required and must be at least 3 characters')
      return
    }

    if (!trimmedAddress) {
      toast.error('Address is required')
      return
    }

    if (!/^[0-9]{10}$/.test(trimmedPhone)) {
      toast.error('Phone must be a 10 digit numeric value')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("address", form.address)
      formData.append("phone", form.phone)


      if (image) formData.append("image", image)

      const res = await axios.put(
        `${backendUrl}/api/user/profile`,
        formData,
        { headers: { token } }
      )

      if (res.data.success) {
        setUser(res.data.user)
        setForm({
          name: res.data.user.name,
          address: res.data.user.address,
          phone: res.data.user.phone
        })
        setImage(null)
        setEditMode(false)
      }

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const resetPasswordFields = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const getPasswordStrength = (password) => {
    const trimmed = password.trim()
    if (!trimmed) return ''
    if (trimmed.length < 6) return 'Too short'
    const strong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(trimmed)
    const medium = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(trimmed)
    return strong ? 'Strong password' : medium ? 'Medium strength' : 'Weak password'
  }

  const handleChangePassword = async () => {
    const trimmedCurrent = currentPassword.trim()
    const trimmedNew = newPassword.trim()
    const trimmedConfirm = confirmPassword.trim()

    if (!trimmedCurrent || !trimmedNew || !trimmedConfirm) {
      toast.error('All password fields are required')
      return
    }

    if (trimmedNew.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }

    if (trimmedNew === trimmedCurrent) {
      toast.error('New password must be different from current password')
      return
    }

    if (trimmedNew !== trimmedConfirm) {
      toast.error('New password and confirmation do not match')
      return
    }

    try {
      setPasswordLoading(true)
      const res = await axios.post(
        `${backendUrl}/api/user/change-password`,
        {
          currentPassword: trimmedCurrent,
          newPassword: trimmedNew
        },
        { headers: { token } }
      )

      if (res.data.success) {
        toast.success(res.data.message || 'Password updated successfully')
        resetPasswordFields()
        localStorage.removeItem('token')
        setToken('')
        navigate('/login')
      } else {
        toast.error(res.data.message || 'Unable to update password')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Unable to update password')
    } finally {
      setPasswordLoading(false)
    }
  }

  const isPasswordValid =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length >= 6 &&
    confirmPassword.trim() === newPassword.trim() &&
    currentPassword.trim() !== newPassword.trim()

  if (!user) return <p className='p-6'>Loading...</p>
  const isChanged =
    form.name !== user.name ||
    form.address !== (user.address || "") ||
    form.phone !== (user.phone || "") ||
    image;

  return (

    <div className='p-6 text-(--text)'>
      {showImage && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowImage(false)}
        >
          <button
            className="absolute top-5 right-5 text-white text-2xl bg-black/50 px-3 py-1 rounded-full hover:bg-black transition"
            onClick={() => setShowImage(false)}
          >
            ✕
          </button>
          <img
            onClick={(e) => e.stopPropagation()}
            src={image ? URL.createObjectURL(image) : user?.image || "/default.png"}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg scale-95 animate-zoomIn"
          />
        </div>
      )}

      <h1 className='text-3xl font-semibold mb-8'>My Profile</h1>

      <div className='bg-(--surface) p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto'>

        {/* Profile Image with Hover Upload */}
        <div className="relative group w-28 h-28 mx-auto mb-6">
          <img onClick={() => setShowImage(true)}
            src={image ? URL.createObjectURL(image) : user?.image || "/default.png"}
            className="w-28 h-28 rounded-full object-cover border"
          />

          {editMode && (
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 cursor-pointer rounded-full">
              Change
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Name */}
        <div className='mb-5'>
          <label className="text-sm text-gray-400 mb-1 block">Name</label>
          <input
            type="text"
            disabled={!editMode}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className='w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 transition'
          />
        </div>

        {/* Email */}
        <div className='mb-5'>
          <label className="text-sm text-gray-400 mb-1 block">Email</label>
          <p className='text-gray-500'>{user.email}</p>
        </div>
        {/* Phone */}
        <div className='mb-5'>
          <label className="text-sm text-gray-400 mb-1 block">Phone</label>
          <input
            type="text"
            disabled={!editMode}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className='w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400'
          />
        </div>

        {/* Address */}
        <div className='mb-5'>
          <label className="text-sm text-gray-400 mb-1 block">Address</label>
          <textarea
            disabled={!editMode}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className='w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400'
          />
        </div>

        <div className='mt-8 border-t border-gray-700/40 pt-5'>
          <button
            type='button'
            onClick={() => setShowPasswordSection((prev) => !prev)}
            className='mb-5 px-5 py-3 bg-transparent border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-100/10 transition'
          >
            {showPasswordSection ? 'Cancel' : 'Change Password'}
          </button>

          {showPasswordSection && (
            <div className='mb-6 border border-gray-700/40 rounded-2xl p-5 bg-gray-950/5'>
              <h2 className='text-lg font-semibold mb-4'>Change Password</h2>

              <div className='mb-4'>
                <label className='text-sm text-gray-400 mb-1 block'>Current Password</label>
                <input
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className='w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400'
                  placeholder='Enter current password'
                />
              </div>

              <div className='mb-4'>
                <label className='text-sm text-gray-400 mb-1 block'>New Password</label>
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400'
                  placeholder='Enter new password'
                />
                {newPassword.trim() && (
                  <p className={`mt-2 text-sm ${getPasswordStrength(newPassword) === 'Strong password' ? 'text-green-400' : getPasswordStrength(newPassword) === 'Medium strength' ? 'text-amber-400' : 'text-red-400'}`}>
                    {getPasswordStrength(newPassword)}
                  </p>
                )}
              </div>

              <div>
                <label className='text-sm text-gray-400 mb-1 block'>Confirm New Password</label>
                <input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full p-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400'
                  placeholder='Confirm new password'
                />
              </div>

              <button
                onClick={handleChangePassword}
                disabled={!isPasswordValid || passwordLoading}
                className='mt-5 w-full px-5 py-3 bg-green-500 hover:bg-green-600 transition text-white rounded-lg disabled:opacity-50'
              >
                {passwordLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className='flex gap-3 mt-6'>
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={!isChanged || loading}
                className='px-5 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-lg disabled:opacity-50'
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setEditMode(false)
                  setForm({
                    name: user.name,
                    address: user.address || "",
                    phone: user.phone || ""
                  })
                  setImage(null)
                }}
                className='px-5 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition'
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className='px-5 py-2 border rounded-lg hover:bg-gray-100 transition'
            >
              Edit Profile
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default Profile