import React from 'react'
import toast from 'react-hot-toast';

const HeaderComponent = () => {
  const handleLogout = () =>{
    toast.success('Logout Sucessfull');
  }
  const title = 'Enabling Efficient Data Mining with Strong Privacy Protection in Cloud Computing';
  return (
    <div className='w-full flex pl-4 shadow-md items-center justify-between bg-secondary text-cblack'>
        <h1 className='font-medium'>{title}</h1>
        <button onClick={handleLogout} className='px-4 h-full py-3 hover:bg-red-800 text-white bg-red-600'>Logout</button>
      </div>
  );
}

export default HeaderComponent