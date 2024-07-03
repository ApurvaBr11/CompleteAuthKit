"use server"

import { GetVarificationTokenByToken } from "@/data/VarificationToken"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"


export const newVarification = async (token:string)=>{
    const existingToken = await GetVarificationTokenByToken(token)
    if(!existingToken){
        return {error: "Token not found!"}
    }
    const hasExpired = new Date(existingToken.expires)<new Date();
    if(hasExpired){
        return {error: "Token expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser){
        return {error: "Email not found"}
    }
    await db.user.update({
        where:{id:existingUser.id},
        data:{
            emailVerified:new Date(),
            email:existingToken.email
        }
    })
    await db.varificationToken.delete({
        where:{id:existingUser.id}
    })
    return {sucess:'Email verified  '}
}