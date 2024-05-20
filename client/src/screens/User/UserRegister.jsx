import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { User  } from '../../assets/images/index'
import { apiHelper } from '../../utils/apiHandler'

const UserRegister = ({handleLogin}) => {
    const navigate = useNavigate()
    const [formData, setForm] = useState({
      name:'',
      username:'',
      email:'',
      gender:'',
      place:'',
      pincode:'',
      phone:'',
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
      if(formData.email == '' ||  formData.password == '' ||  formData.name == '' ||  formData.gender == '' ||  formData.username == '' ||  formData.place == '' ||  formData.pincode == '' ||  formData.phone == ''){
        return toast.error('Must fill the all fields!');
      }
    

      await apiHelper.post('/api/user/create',{
        name:formData.name,
        username:formData.username,
        email:formData.email,
        gender:formData.gender,
        phone:formData.phone,
        place:formData.place,
        pincode:formData.pincode,
        password:formData.password,
      }).then((res)=>{
        localStorage.setItem('token',res.data.token);
        toast.success('Registration Successfull')
        navigate('/');
      }).catch((err)=>{
        toast.error(err.response.data.message);
      })
  
      
      
    }
    return (
      <div className='bg-white h-full w-full shadow-md flex items-center justify-center p-4'>
        <div className='w-[900px]  flex flex-col shadow-md p-4 gap-4'>
        <div className='bg-cblack px-4 py-3  text-white'>
            User Register
          </div>
          <div className='w-full flex h-full gap-4'>
            <div className='w-1/2 h-full  flex flex-col gap-2'>
              <div className='w-full flex flex-col gap'>
                <label className='py-3 w-full' htmlFor="name">Name</label>
                <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="text" name="name" id="name" />
              </div>
             
              <div className='w-full flex flex-col gap'>
                <label className='py-3 w-full' htmlFor="email">Email Adresss</label>
                <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="email" name="email" id="email" />
              </div>
              <div className='w-full flex flex-col gap'>
                <label className='py-3 w-full' htmlFor="phone">Phone</label>
                <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="number" name="phone" id="phone" />
              </div>
              <div className='w-full flex flex-col gap'>
                <label className='py-3 w-full' htmlFor="pincode">Pincode</label>
                <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="number" name="pincode" id="pincode" />
              </div>
              <button onClick={handleSubmit} className='py-3 text-white bg-cblack'>Register</button>
            </div>
            <div className='w-1/2 h-full  flex flex-col gap-2'>
              <div className='w-full flex flex-col gap'>
                <label className='py-3 w-full' htmlFor="username">Username</label>
                <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="text" name="username" id="username" />
              </div>
              <div className='w-full flex flex-col gap'>
                <label className='py-3 w-full' htmlFor="email">Gender</label>
                <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="text" name="gender" id="gender" />
              </div>
              <div className='w-full flex flex-col gap'>
                <label className='py-3 w-full' htmlFor="email">Place</label>
                <input className='py-3 w-full outline-none px-4 border' onChange={handleChange}  type="text" name="place" id="place" />
              </div>
              <div className='w-full flex flex-col gap'>
              <label className='py-3 w-full' htmlFor="password">Password</label>
              <input className='py-3 w-full outline-none px-4 border' onChange={handleChange} type="text" name="password" id="password" />
            </div>
            <div className='w-full flex flex-col gap'>
              <div className='w-full py-3 flex gap-2'>
                Already have an Account? 
                <button onClick={()=>handleLogin(true)} className='font-medium hover:underline'>Login</button>
              </div>
              
            </div>
            </div>
          
          </div>
        </div>
      </div>
    )
}

export default UserRegister