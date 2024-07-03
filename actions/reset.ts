"use server"

import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'
import { ResetSchema } from '@/schemas'
import * as z from 'zod'

export const reset = async(values:z.infer<typeof ResetSchema>)=>{
    const validatedFeilds = ResetSchema.safeParse(values)

    if(!validatedFeilds.success){
        return {error : ' Invalid Email Address'}
    }
    const {email} = validatedFeilds.data;
    const existingUser = await getUserByEmail(email)
    if(!existingUser){
        return {error : 'email not found'}
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(passwordResetToken.email,passwordResetToken.token)

    return {success : 'Reset email successfully sent'}
}