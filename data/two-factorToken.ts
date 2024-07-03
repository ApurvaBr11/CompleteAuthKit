import { db } from "@/lib/db";

export const getTwoFactorByToken = async(token: string) => {
    try {
        const twoFactorToken = await db.twofactorToken.findUnique({
            where:{token}
        });
        return twoFactorToken;
    } catch (error) {
        return null;
    }
}

export const getTwoFactorByEmail = async(email: string) => {
    try {
        const twoFactorToken = await db.twofactorToken.findFirst({
            where:{email}
        });
        return twoFactorToken;
    } catch (error) {
        return null;
    }
}