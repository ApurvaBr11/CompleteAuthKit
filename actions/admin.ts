"use server"

import { currentUserRole } from "@/lib/auth"
import { UserRole } from "@prisma/client";

export const admin = async ()=>{
    const role = await currentUserRole();
    if(role === UserRole.ADMIN){
        return {success :"Allowd"}
    }
    return  {error:"Forbidden"}
}