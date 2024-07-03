import { db } from "@/lib/db"

export const GetVarificationTokenByEmail = async (email:string)=>{
    try {
        const varificationToken = db.varificationToken.findFirst({
            where:{
                email
            }
        })
        return varificationToken
    } catch (error) {
        return null
    }
}

export const GetVarificationTokenByToken = async (token:string)=>{
    try {
        const varificationToken = db.varificationToken.findUnique({
            where:{
                token
            }
        })
        return varificationToken
    } catch (error) {
        return null
    }
}