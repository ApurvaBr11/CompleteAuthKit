"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginForm from "./LoginForm";

interface LoginbuttonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const Loginbutton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginbuttonProps) => {
    
    const router = useRouter()

  const onClick = () => {
    router.push('/auth/login')
  };

  if (mode === "modal") {
    return (
      
        <Dialog>
          <DialogTrigger asChild={asChild}>
            {children}
          </DialogTrigger>
          <DialogContent className=" p-0 w-auto bg-transparent border-none">
            <LoginForm/>
          </DialogContent>
        </Dialog>
    )
  }

  return <span onClick={onClick}>{children}</span>;
};

export default Loginbutton;
