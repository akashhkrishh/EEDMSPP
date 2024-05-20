import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { User  } from '../../assets/images/index'
import { apiHelper } from '../../utils/apiHandler'

const UserLogin = ({handleLogin}) => {
    const navigate = useNavigate()
    const [formData, setForm] = useState({
      email:'',
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
      if(formData.email == '' ||  formData.password == '' ){
        return toast.error('Must fill the all fields!');
      }
    

      await apiHelper.post('/api/user/login',{
        email:formData.email,
        password:formData.password,
      }).then((res)=>{
        localStorage.setItem('token',res.data.token);
        toast.success('Login Successfull')
        navigate('/dashboard/users')
      }).catch((err)=>{
        toast.error(err.response.data.message);
      })
  
      
      
    }
    return (
      <div className='bg-white h-full w-full shadow-md flex items-center justify-center p-4'>
        <div className='w-[450px] flex flex-col shadow-md p-4 gap-4'>
          <div className='bg-cblack px-4 py-3  text-white'>
            User Login
          </div>
          <div className='w-full h-[150px]'>
            <img className='w-full h-full' src={User} alt="" />
          </div>
          <div className='flex-1 w-full flex flex-col gap-4'>
          <div className='w-full flex flex-col gap'>
              <label className='py-3 w-full' htmlFor="email">Email Adresss</label>
              <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="email" name="email" id="email" />
            </div>
            <div className='w-full flex flex-col gap'>
              <label className='py-3 w-full' htmlFor="password">Password</label>
              <input className='py-3 w-full outline-none px-4 border' onChange={handleChange} type="text" name="password" id="password" />
            </div>
            <div className='w-full flex gap-4'>
              <button onClick={handleSubmit} className='bg-cblack w-full  text-white py-2 px-4'>Login</button>
            </div>
            <div className='w-full flex gap-4'>
              <div className='w-full  text-cblack py-2 px-4'>Create an Account? <button
              className='font-medium hover:underline'
              onClick={()=>{;
                handleLogin(false)
              }}>Sign up</button></div>
            </div>
          </div>
            
  
        </div>
  
      </div>
    )
}

export default UserLogin