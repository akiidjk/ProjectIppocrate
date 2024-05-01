"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import Loader from "@/app/components/loader";


export default function CreateAdminPage() {
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
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30} minSize={20}>
                    <div className="m-7 flex">
                        <h1 className="ms-auto me-auto text-4xl font-semibold">
                        Form
                            </h1>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={70} minSize={40}>
                    <div
                        className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
                        <div className="flex">
                            <h1 className="ms-auto me-auto text-4xl mt-7 font-semibold">
                                Preview page
                            </h1>
                        </div>
                        <div className="h-screen flex items-center justify-center">
                            <h1 className="font-medium text-3xl">Content Preview</h1>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
        ;
}
