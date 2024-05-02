"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useEffect, useRef, useState} from "react";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import Loader from "@/app/components/loader";
import Form from "@/app/admin/create_page/components/form";
import Navbar from "@/app/components/navbar";
import {Button} from "@/components/ui/button";
import Expand from "@/app/admin/create_page/components/svg/expand";

import {ImperativePanelHandle} from "react-resizable-panels";




export default function CreateAdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isFull, setIsFull] = useState(false);

    const resizeNull = useRef<ImperativePanelHandle>(null);

    useEffect(() => {
        resizeNull.current?.resize(0)
    }, [isFull]);


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
            <div>
                <ResizablePanelGroup direction="horizontal">
                    {
                        isFull ?
                            <ResizablePanel defaultSize={0} minSize={0} ref={resizeNull}></ResizablePanel>
                            :
                            <ResizablePanel defaultSize={30} minSize={20}>
                                <div className="m-7 flex ">
                                    <h1 className="ms-auto me-auto text-4xl font-semibold">
                                        Form
                                    </h1>
                                </div>
                                <div>
                                    <Form/>
                                </div>
                            </ResizablePanel>
                    }
                    <ResizableHandle/>
                    <ResizablePanel defaultSize={70} minSize={65}>
                        <div
                            className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
                            <div className="relative top-2 left-2">
                                <Button onClick={() => setIsFull(!isFull)} size="icon">
                                    <Expand color={"#ffffff"} size={"30px"}/>
                                </Button>
                            </div>
                            <div className="flex">
                                <h1 className="ms-auto me-auto text-4xl mt-7 font-semibold">
                                    Preview page
                                </h1>
                            </div>
                            <div className="h-[81vh] flex items-center justify-center">
                                <h1 className="font-medium text-3xl">Content Preview</h1>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}