import React from 'react'
import Navbar from './components/Navbar'
import Background from './assets/bg.jpg';


import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div
      className="bg-cover bg-center h-screen w-full"
      style={{
        backgroundImage: `url(${Background})`
      }}>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout