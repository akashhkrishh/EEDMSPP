import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Server, User } from '../assets/images';

const RootServerScreen = () => {
  const navigate = useNavigate()
  const [formData, setForm] = useState({
    username:'',
    password:'',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const handleSubmit = async() =>{
    if(formData.username == '' ||  formData.password == '' ){
      return toast.error('Must fill the all fields!');
    }
    if(formData.username != 'admin' ||  formData.password != 'admin' ){
      return toast.error('Invalid Username and Passowrd');
    }

    toast.success('Login Successful');
    navigate('/dashboard/server')
    
    
  }
  return (
    <div className='bg-white h-full w-full shadow-md flex items-center justify-center p-4'>
      <div className='w-[450px] flex flex-col shadow-md p-4 gap-4'>
        <div className='bg-cblack px-4 py-3  text-white'>
          Server Login
        </div>
        <div className='w-full h-[200px]'>
          <img className='w-full h-full' src={Server} alt="" />
        </div>
        <div className='flex-1 w-full flex flex-col gap-4'>
        <div className='w-full flex flex-col gap'>
            <label className='py-3 w-full' htmlFor="username">Username</label>
            <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="text" name="username" id="username" />
          </div>
          <div className='w-full flex flex-col gap'>
            <label className='py-3 w-full' htmlFor="password">Password</label>
            <input className='py-3 w-full outline-none px-4 border' onChange={handleChange} type="text" name="password" id="password" />
          </div>
          <div className='w-full flex gap-4'>
            <button onClick={handleSubmit} className='bg-cblack w-full  text-white py-2 px-4'>Login</button>
          </div>

        </div>
          

      </div>

    </div>
  )
}

export default RootServerScreen