import React from 'react'
import logo from "../assets/logo.png"


function AuthLayout({children}) {
  return (
    <>
    <header className='justify-center items-center flex py-3 h-20 shadow-md'>
    <img src={logo} alt="logo"
    width={180}
    height={60}
     />
    </header>

    {children}
    </>
  )
}

export default AuthLayout