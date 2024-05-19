import React, { useEffect, useState } from 'react'
import { UserNavList } from './NavList'
import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react';
import { apiHelper } from '../../utils/apiHandler';

const UserNavbar = () => {
  const [name, setName] = useState();
  const getName = async() =>{
    await apiHelper.get("/api/user/name")
    .then((res)=>{setName(res.data.name);
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
      getName()
  },[])
  return (
    <div className='h-full shadow-md w-full flex justify-between flex-col'>
      
     
      <div className='w-full justify-center flex flex-col gap-2 p-4'>
        {
          UserNavList.map((items,index)=>{
            return(
              <NavLink key={index} to={items.path} className='w-full hover:bg-cblack hover:text-white p-2 flex gap-2'>
                  {items.icons}
                  {items.title}
              </NavLink>
            );
          })
        }
      </div>
      <div className='flex gap-2 text-md px-4 text-white py-3 w-full'>
        <div className='h-10 w-10 bg-cblack text-white items-center justify-center flex font-semibold'><User size={25}/></div>
        <div className='border-cblack border truncate text-cblack flex items-center font-medium px-2 flex-1 w-10 h-10 '>
          {name}
        </div>
      </div>
    </div>
  )
}

export default UserNavbar