import React from 'react'
import { RootNavList } from './NavList'
import { NavLink } from 'react-router-dom';

const RootNavbar = () => {
  return (
    <div className='h-full shadow-md w-full'>
     
      <div className='w-full justify-center flex flex-col gap-2 p-4'>
        {
          RootNavList.map((items,index)=>{
            return(
              <NavLink key={index} to={items.path} className='w-full hover:bg-cblack hover:text-white p-2 flex gap-2'>
                  {items.icons}
                  {items.title}
              </NavLink>
            );
          })
        }
      </div>
    </div>
  )
}

export default RootNavbar