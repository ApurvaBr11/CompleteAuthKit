"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVarificationToken } from "@/lib/tokens";
import { sendVarificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFeilds = RegisterSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid Fields!" }
  }

  const  {email,password,name} = validatedFeilds.data

  const hashedPassword =await bcrypt.hash(password,10)

  const existingUser = await getUserByEmail(email)

  if(existingUser){
    return {error:'User already exists'}
  }
  try {
    await db.user.create({
      data:{
        email,
        name,
        password:hashedPassword
      }
    })
  } catch (error) {
    console.log(error)
  }

  const varificationToken = await generateVarificationToken(email)

  await sendVarificationEmail(varificationToken.email,varificationToken.token)

  return { success: "Confirmation email sent" };
};