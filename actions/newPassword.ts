"use server";

import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }
  const validatedfeilds = NewPasswordSchema.safeParse(values);

  if (!validatedfeilds.success) {
    return { error: "Invalid Feilds" };
  }

  const { password } = validatedfeilds.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid Token" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: "Token expired" };
  }

  const existingUsr = await getUserByEmail(existingToken.email);

  if (!existingUsr) {
    return { error: "Email not found" };
  }
  const hashedPassword =await bcrypt.hash(password,10)

  await db.user.update({
    where:{id:existingUsr.id},
    data:{password:hashedPassword}
  })

  await db.passwordResetToken.delete({
    where:{id:existingToken.id}
  })

  return {success : 'password updated successfully'}
};
