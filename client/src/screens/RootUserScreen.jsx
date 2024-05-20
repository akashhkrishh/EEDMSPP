import React, { useState } from 'react'
import UserLogin from './User/UserLogin';
import UserRegister from './User/UserRegister';

const RootUserScreen = () => {
  const [isLogin, setLogin] = useState(true);
  const handleLogin = (value) =>{
    setLogin(value)
  }
  return (
    <div  className='bg-white h-full w-full shadow-md flex justify-center items-center'>
      {
        isLogin 
        ?
        <UserLogin handleLogin={handleLogin}/>
        :
        <UserRegister handleLogin={handleLogin}/>
      }
    </div>
  )
}

export default RootUserScreen