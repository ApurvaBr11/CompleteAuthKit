'use client'

import {DropdownMenu , DropdownMenuContent ,DropdownMenuItem ,DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import { FaUser } from 'react-icons/fa'

import {Avatar , AvatarFallback , AvatarImage} from "@/components/ui/avatar"
import { useCurrentUser } from '@/hooks/useCurrentuser'
import LogOutButton from './LogOutButton'

const UserButton = () => {
    const user = useCurrentUser()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""}/>
                <AvatarFallback className='bg-pink-400'>
                    <FaUser/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' w-40 ' align='end'>
            <LogOutButton>
                <DropdownMenuItem>
                    Logout
                </DropdownMenuItem>
            </LogOutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton