import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendVarificationEmail = async (email: string , token:string) => {
    const confirmLink = `https://complete-auth-kit.vercel.app/auth/new-verification?token=${token}`

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Confirm Notification",
        html:`<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`
    })

}


export const sendPasswordResetEmail = async (email: string , token:string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Reset password reset",
        html:`<p>Click <a href="${resetLink}">here</a> to Reset password</p>`
    })

}

export const twoFactorTokenEmail = async (email: string , token:string) => {

    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Reset password reset",
        html:`<p>Ur 2FA Code is : ${token}</p>`
    })

}