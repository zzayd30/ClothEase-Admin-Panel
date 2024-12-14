import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(backendURL + "/api/user/admin",{email, password})
      console.log(response)
      if (response.data.success) {
        setToken(response.data.token) 
        localStorage.setItem("token", response.data.token)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className="min-w-72 mb-3">
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e) => {setEmail(e.target.value)}} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Your Email' required/>
            </div>
            <div className="min-w-72 mb-3">
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e) => {setPassword(e.target.value)}} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Your Password' required/>
            </div>
            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='Submit'>Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login
