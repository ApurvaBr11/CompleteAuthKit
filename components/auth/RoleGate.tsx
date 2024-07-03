'use client'

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import FormError from "../FormError";

interface RoleGateProps{
    children : React.ReactNode;
    allowedRole : UserRole;
}

const RoleGate = ({children,allowedRole}:RoleGateProps) => {
    const role = useCurrentRole()
    if (role !== allowedRole) {
        return (
            <FormError message="U r not alllowed for this content"/>
        )
    }

    return (
        <>
        {children}
        </>
    )
}

export default RoleGate