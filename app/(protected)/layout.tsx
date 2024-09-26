import React from 'react'
import Navbar from './_components/Navbar'

interface ProtectedlayoutProps {
    children : React.ReactNode
}

const Protectedlayout = ({children}:ProtectedlayoutProps) => {
  return (
    <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
        <Navbar/>
        {children}
    </div>
  )
}

export default Protectedlayout