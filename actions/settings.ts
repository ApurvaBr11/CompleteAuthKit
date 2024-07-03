"use server";
import  bcrypt  from 'bcryptjs';
import { currentUser } from "@/lib/auth";
import { SettingSchema } from "./../schemas/index";

import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateVarificationToken } from "@/lib/tokens";
import { sendVarificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  const userId = user.id;
  if (typeof userId !== "string") {
    return { error: "Invalid user ID" };
  }
  const dbUser = await getUserById(userId);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if(user.isOAuth){
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwofactorEnabled = undefined
  }

  if(values.email && values.email !== user.email){
    const existingUser = await getUserByEmail(values.email)
    if(existingUser && existingUser.id !== user.id){
      return { error: "Email already in use" };
    }
    const verificationToken = await generateVarificationToken(values.email)
    await sendVarificationEmail(
      verificationToken.email,verificationToken.token
    )
    return {success : "Verification Email sent successfully"}
  }

  if(values.password && values.newPassword && dbUser.password){
      const passwordMatch = await bcrypt.compare(values.password, dbUser.password)
      if(!passwordMatch){
          return { error: "Password does not match" };
      }
      const hashedPassword = await bcrypt.hash(values.newPassword,10)
      values.password = hashedPassword;
      values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });
  return { success: "Settings Updated" };
};
