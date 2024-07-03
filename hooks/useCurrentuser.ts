import { useSession } from "next-auth/react"

export const useCurrentUser= ()=>{
    const sesion = useSession()
    return sesion.data?.user;
}