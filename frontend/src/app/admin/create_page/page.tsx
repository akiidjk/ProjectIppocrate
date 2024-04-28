"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateAdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        router.replace("/admin/login");
        return null;
    }

    if (status === "loading") {
        return <div>Caricamento...</div>;
    }

    console.log("Token Bearear:", session?.user?.name);

    return (
        <div>
            <p>Pagina protetta</p>
        </div>
    );
}
