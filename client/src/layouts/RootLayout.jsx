import React from 'react'
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import ServerNavbar from '../components/navbars/ServerNavbar';
import RootNavbar from '../components/navbars/RootNavbar';

const RootLayout = () => {
  return (
    <div className='w-screen h-screen bg-primary fixed flex flex-col p-4'>
      <div className='flex h-full  gap-4'>
      <nav className='min-w-[250px] w-[16vw] h-full bg-secondary '>
        <RootNavbar/>
      </nav>
      <section className='w-[84vw]  h-full'>
        <Outlet/>
      </section>

      </div>
      
    </div>
  )
}

export default RootLayout