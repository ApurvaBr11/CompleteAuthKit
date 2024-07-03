'use client'

import { logout } from "@/actions/logout"
import React from "react"

interface logOutButtonP{
    children: React.ReactNode
}

const LogOutButton = ({children}:logOutButtonP) => {

    const onClick = () => {
        logout()
    }

  return (
    <span onClick={onClick} className="cursor-pointer">{children}</span>
  )
}

export default LogOutButton