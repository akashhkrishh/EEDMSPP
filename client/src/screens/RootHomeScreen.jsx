import React from 'react'
import { Server, User, Attacker } from '../assets/images/index'
import {NavLink} from 'react-router-dom'
const RootHomeScreen = () => {
  const navData = [
    { title:"User", path:'/users', image:User },
    { title:"Server", path:'/server', image:Server },
    { title:"Attacker", path:'/attacker', image:Attacker },
  ]
  return (
    <div  className='bg-secondary h-full w-full shadow-md flex items-center justify-center gap-4'>
      {
        navData.map((items,index)=>{
          return(
            <NavLink className={'ring-cblack hover:scale-105 hover:ring-1'} to={items.path}>
              <div className='bg-secondary h-[300px] shadow-md w-[250px]'>
                <div className='w-full h-[250px] flex items-center justify-center'>
                  <img src={items.image} alt="" />
                </div>
                <div className='w-full flex items-center justify-center font-medium h-[50px] bg-cblack text-white'>
                  {items.title}
                </div>

              </div>
            </NavLink>
          );
        })
      }
    </div>
  )
}

export default RootHomeScreen