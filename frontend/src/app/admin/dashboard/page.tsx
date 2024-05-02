"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Navbar from "@/app/components/navbar";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Loader from "@/app/components/loader";


export default function Dashboard(){
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
            <div className="w-full h-[90vh] flex">
                <h1 className="absolute left-1/2 transform -translate-x-1/2 mt-16 text-[38px] font-bold">
                    Dashboard
                </h1>
                <div className="flex ms-auto me-auto my-auto">

                    <Card className="w-[450px] h-[450px] m-20">
                        <CardHeader>
                            <CardTitle>Crea una nuova pagina</CardTitle>
                            <CardDescription>Premi sul bottone per creare una nuova pagina</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => router.push("/admin/create_page")}>
                                Add
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="w-[450px] h-[450px] m-20">
                        <CardHeader>
                            <CardTitle>Rimuovi una pagina</CardTitle>
                            <CardDescription>Premi il bottone per rimuovere una pagina esistene</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => router.push("/admin/delete_page")}>
                                Remove
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>

    )
}