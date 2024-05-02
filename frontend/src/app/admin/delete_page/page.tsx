"use client"

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Loader from "@/app/components/loader";
import Navbar from "@/app/components/navbar";


export default function DeletePage(){
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        router.replace("/admin/login");
        return null;
    }

    if (status === "loading") {
        return <Loader/>;
    }

    console.log("Token Bearear:", session?.user?.name);
    return (
        <div>
            <Navbar/>
            {/* Render the card base on the list*/}
        </div>
    );
}