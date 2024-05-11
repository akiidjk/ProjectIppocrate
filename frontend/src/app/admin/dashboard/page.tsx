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
import {getSession, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Loader from "@/app/components/loader";
import { useEffect, useState } from "react";


export default function Dashboard(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    async function getClientSideSession() {
        const session = await getSession()
        return session?.user
      }

    useEffect(() => {
        getClientSideSession().then(session => {
            console.log(session)
            if (!session) {
              router.replace("/admin/login")
              return null
            }else{
                setLoading(false);
            }
          })
      }, []);
    
      if (loading) {
        return <Loader />;
      }
      
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