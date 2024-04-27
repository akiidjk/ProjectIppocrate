'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateAdminPage(){
    const {data:session, status} = useSession();
    const router = useRouter();
    console.log(session)
    
    //TODO make the real validation 
    if (!session){
        console.log("MMM NO BRO YOU ARE NOT LOGGED LOL")
        router.replace("/admin/login")
    }

    return (
        <div>
            <p>Protected page</p>
        </div>
    );
}
