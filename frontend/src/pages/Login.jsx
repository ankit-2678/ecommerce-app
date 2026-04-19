import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
function Login() {

  const [currentState, setCurrentState] = useState('Sign Up')
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext)
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      if(currentState==='Sign Up'){
        const response = await axios.post(`${backendUrl}/api/user/register`,{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
        
      }else{
        const response = await axios.post(`${backendUrl}/api/user/login`,{email,password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
        }else{
          toast.error(response.data.message)
        }
        
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token, navigate])
  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-6 text-gray-100 p-8 bg-gray-800 rounded-lg shadow-lg'>
        <div className='inline-flex items-center gap-2 mb-4'>
          <p className='prata-regular text-3xl text-white'>
            {currentState}
          </p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-400' />
        </div>

        {currentState==='Login' ? '':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Name' required />}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Email' required />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' placeholder='Password' required />

        <div className='w-full flex justify-between text-sm mt-2'>
          {
            currentState==='Login' ? 
            <p onClick={()=>setCurrentState('Sign Up')} className='  cursor-pointer text-blue-400 hover:text-blue-300'>Create Account</p> :
            <p onClick={()=>setCurrentState('Login')} className='cursor-pointer text-blue-400 hover:text-blue-300'>Login here</p>
          }
        </div>
        <button className='bg-white text-black font-medium px-8 py-3 mt-4 rounded-md hover:bg-gray-200 transition-colors duration-200'>
          {currentState==='Login' ? 'Sign In':'Sign Up'} 
        </button>
      </form>
    </div>
  )
}

export default Login
