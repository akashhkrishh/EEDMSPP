import React from 'react'
import { Outlet } from 'react-router-dom';
import UserNavbar from '../components/navbars/UserNavbar';
import HeaderComponent from '../components/HeaderComponent';

const UserLayout = () => {
  return (
    <div className='w-screen h-screen bg-primary fixed flex flex-col'>
      <div className='h-[10vh]  p-4 pb-0'>
        <HeaderComponent/>
      </div>
        
      <div className='flex h-[90vh] gap-4 p-4 pt-2'>
      <nav className='min-w-[250px] w-[16vw] h-full bg-secondary bg-'>
        <UserNavbar/>
      </nav>
      <section className='w-[84vw]  h-full'>
        <Outlet/>
      </section>

      </div>
      
    </div>
  )
}

export default UserLayout