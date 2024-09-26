"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVarificationToken, generatetwoFactorToken } from "@/lib/tokens";
import { sendVarificationEmail, twoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorByEmail } from "@/data/two-factorToken";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factorConfirmation";



export const login = async (values: z.infer<typeof LoginSchema>,callbackUrl?:string) => {
  const validatedFeilds = LoginSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid Fields!" }
  }

  const  {email,password , code} = validatedFeilds.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesnt exist"}
  }
  
  

  if(!existingUser.emailVerified){
    
      const varificationToken = await generateVarificationToken(
        existingUser.email
      )
      await sendVarificationEmail(varificationToken.email,varificationToken.token)

    
    return { success:'success'}
  }

  if(existingUser.isTwoFactorEnabled && existingUser.email){

    if(code){
      const twoFactorToken = await getTwoFactorByEmail(existingUser.email)
      if(!twoFactorToken ){
        return { error: "Invalid twoFactor code" }
      }

      if(twoFactorToken.token !== code ){
        return {error:"Invalid Code"}
      }

      const hasExpired = new Date(twoFactorToken.expires ) <new Date();

      if(hasExpired){
        return {error : "Code Expired"}
      }

      await db.twofactorToken.delete({
        where:{
          id:twoFactorToken.id
        }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if(existingConfirmation){
        await db.twoFactorConfirmation.delete({
          where:{id:existingConfirmation.id}
        })
      }

      await db.twoFactorConfirmation.create({
        data:{
          userId:existingUser.id
        }
      })

    } else{
    const twoFactorToken = await generatetwoFactorToken(existingUser.email)
    await twoFactorTokenEmail(twoFactorToken.email,twoFactorToken.token)

    return {twoFactor:true}
    }
  }

  try {
    await signIn("credentials",{
      email,password,redirectTo:DEFAULT_LOGIN_REDIRECT || callbackUrl
    })
  } catch (error) {
    if(error instanceof AuthError){
      switch (error.type) {
        case 'CredentialsSignin':
          return {error : "Invalid credentials"}
          
          default:
          return {error : "Something went wrong"}
      }
      }
    throw error;
    
  }

  

  return { success: "Logged In Successfully!" };
};