'use client';

import React from "react";
import { Label } from "../../components/AcernityUI/label";
import { Input } from "../../components/AcernityUI/input";
import { cn } from "@/utils/cn";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginAdminPage(){

    const router = useRouter();
    const [data,setData] = useState({
        username: "",
        password: ""
    });
    //TODO implement the communication with BE
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
  
      setData({
          ...data,
          username: formData.get("username")?.toString() ?? '',
          password: formData.get("password")?.toString() ?? ''
      });
  
      try {
          await signIn("credentials", {
              ...data,
              redirect: false,
          });
          
          router.push("/admin/create_page");
      } catch (error) {
          console.error("Errore durante il login:", error);
          // Gestisci l'errore di autenticazione qui
      }
    };

    return (
        <div className="h-screen flex">
            <div className="m-auto max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Benvenuto sulla admin page
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Fai l accesso per poter creare nuove pagine 
                </p>

                <form className="my-8" onSubmit={login}>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="username">Username</Label>
                        <Input name="username" id="username" placeholder="admin" type="text" />
                    </LabelInputContainer>  

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input name="password" id="password" placeholder="••••••••" type="password" />
                    </LabelInputContainer>

                    <button
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                      type="submit"
                      >
                      Login &rarr;
                      <BottomGradient />
                    </button>

                </form>
            </div>
        </div>
    )
}

const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
   
  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };