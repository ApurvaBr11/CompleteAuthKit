import { GetVarificationTokenByEmail } from '@/data/VarificationToken'
import crypto from 'crypto'
import {v4 as uuidv4} from 'uuid'
import { db } from './db'
import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken'
import { getTwoFactorByEmail } from '@/data/two-factorToken'

export const generatetwoFactorToken = async (email:string)=>{
    const token = crypto.randomInt(10_000,1_00_000).toString();
    const expires = new Date(new Date().getTime()+ 5 * 60 *1000);

    const existingToken = await getTwoFactorByEmail(email)
    if(existingToken){
        await db.twofactorToken.delete({
            where:{
                id:existingToken.id
            }
        })
    }
    const twoFactorToken = await db.twofactorToken.create({
        data:{
            email,token,expires
        }
    })
    return twoFactorToken;

}

export const generateVarificationToken = async (email:string  )=>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime()+3600*1000)

     const existingToken = await GetVarificationTokenByEmail(email)

     if(existingToken){
        await db.varificationToken.delete({
            where:{
                id: existingToken.id
            }
        })
     }
     const varificationToken = await db.varificationToken.create({
        data:{
            email,token,expires
        }
     })

     return varificationToken
}

export const generatePasswordResetToken = async (email:string)=>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime()+3600*1000)

     const existingToken = await getPasswordResetTokenByEmail(email)

     if(existingToken){
        await db.passwordResetToken.delete({
            where:{
                id: existingToken.id
            }
        })
     }  
     
     const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,token,expires
        }
     })

     return passwordResetToken

}