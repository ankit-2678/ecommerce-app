import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

function Profile() {

  const { backendUrl, token } = useContext(ShopContext)

  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: "", address: "" })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token }
      })

      if (res.data.success) {
        setUser(res.data.user)
        setForm({
          name: res.data.user.name,
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
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", form.name)
      

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

  if (!user) return <p className='p-6'>Loading...</p>

  return (
    <div className='p-6 text-(--text)'>

      <h1 className='text-3xl font-semibold mb-8'>My Profile</h1>

      <div className='bg-(--surface) p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto'>

        {/* Profile Image with Hover Upload */}
        <div className="relative group w-28 h-28 mx-auto mb-6">
          <img
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

        {/* Address */}
        

        {/* Buttons */}
        <div className='flex gap-3 mt-6'>
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className='px-5 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-lg disabled:opacity-50'
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setEditMode(false)
                  setForm({
                    name: user.name,
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