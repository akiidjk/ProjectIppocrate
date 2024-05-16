"use client"

import { getSession } from "next-auth/react";

import { getSession } from "next-auth/react";
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
import { RefreshCcw  } from 'lucide-react';
import {ImperativePanelHandle} from "react-resizable-panels";
import {Paragraph, usePages} from "@/context/page_provider";
import PreviewPage from "@/app/admin/create_page/components/preview_page";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useToast} from "@/components/ui/use-toast";



export default function CreateAdminPage() {
    const router = useRouter();
    const [isFull, setIsFull] = useState(false);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState<[File, string][]>([]);
    const resizeNull = useRef<ImperativePanelHandle>(null);
    const { addPage } = usePages();
    const [token,setToken] = useState("");
    const [key, setKey] = useState(0);
    const {toast} = useToast()


    const rebuildComponent = () => {
        setKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        async function fetchSession() {
            const session = await getSession();
            setToken(session?.user?.name ?? 'session not found');
        }
        fetchSession();
    }, [router]);

    const [localPage, setLocalPage] = useState({
        id: '',
        page: {
            title: '',
            paragraphs: []
        },
        time: new Date().toDateString()
    });

    const handleParagraph = (newParagraph: Paragraph) => {
        // @ts-ignore
        setLocalPage(prevLocalPage => ({
            ...prevLocalPage,
            page: {
                ...prevLocalPage.page,
                paragraphs: [...prevLocalPage.page.paragraphs, newParagraph]
            }
        }));
    };

    const handleImage = (newImage: [File, string]) => {
        setFiles(prevFiles => [
            ...prevFiles,
            newImage
        ]);
    }
    

    const savePage = () => {
        addPage(localPage, token, files).then(r => {
            if(r != 200){
                toast({
                    variant:"destructive",
                    description: "Oh no!! un c'è stato une errore con la creazione della pagina",
                })
            }else {
                toast({
                    className: "bg-[#3aba6f] text-[#fdfdfd]",
                    description: "Pagina salvata e inviata con successo",
                })
            }
        });
        setLocalPage(
            {
                id: '',
                page: {
                    title: '',
                    paragraphs: []
                },
                time: new Date().toDateString()
            }
        )

    };


    const deleteParagraph = (index:number) => {
        setLocalPage(prevLocalPage => {
            const newParagraphs = [...prevLocalPage.page.paragraphs];
            newParagraphs.splice(index, 1);
            return {
                ...prevLocalPage,
                page: {
                    ...prevLocalPage.page,
                    paragraphs: newParagraphs
                }
            };
        });

        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };



    async function getClientSideSession() {
        const session = await getSession()
        return session?.user
      }

    useEffect(() => {
        resizeNull.current?.resize(0)
    }, [isFull]);

    useEffect(() => {
        getClientSideSession().then(session => {
            if (!session) {
              router.replace("/admin/login")
              return null
            }else{
                setLoading(false);
            }
          })
      }, [router]);

      if (loading) {
        return <Loader />;
      }


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
                                    <Form deleteParagraph={deleteParagraph} handleParagraph={handleParagraph} localPage={localPage} savePage={savePage} handleImage={handleImage}/>
                                </div>
                            </ResizablePanel>
                    }
                    <ResizableHandle/>
                    <ResizablePanel defaultSize={70} minSize={65}>
                        <div
                            className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
                            <div className="relative flex top-2 left-2">
                                <Button className="mr-3" onClick={() => setIsFull(!isFull)} size="icon">
                                    <Expand color={"#ffffff"} size={"30px"}/>
                                </Button>
                                <Button onClick={() => rebuildComponent()} size="icon">
                                    <RefreshCcw className="stroke-white size-[30px]"/>
                                </Button>
                            </div>
                            <div className="flex">
                                <h1 className="ms-auto me-auto text-4xl mt-7 font-semibold">
                                    Anteprima della pagina
                                </h1>
                            </div>
                            <div className="h-[81vh] flex items-center justify-center">
                                {/*<h1 className="font-medium text-3xl">Content Preview</h1>*/}
                                <ScrollArea className="h-[80%]">
                                    <PreviewPage key={key} localPage={localPage}/>
                                </ScrollArea>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
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
                                    <Form deleteParagraph={deleteParagraph} handleParagraph={handleParagraph} localPage={localPage} savePage={savePage} handleImage={handleImage}/>
                                </div>
                            </ResizablePanel>
                    }
                    <ResizableHandle/>
                    <ResizablePanel defaultSize={70} minSize={65}>
                        <div
                            className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
                            <div className="relative flex top-2 left-2">
                                <Button className="mr-3" onClick={() => setIsFull(!isFull)} size="icon">
                                    <Expand color={"#ffffff"} size={"30px"}/>
                                </Button>
                                <Button onClick={() => rebuildComponent()} size="icon">
                                    <RefreshCcw className="stroke-white size-[30px]"/>
                                </Button>
                            </div>
                            <div className="flex">
                                <h1 className="ms-auto me-auto text-4xl mt-7 font-semibold">
                                    Anteprima della pagina
                                </h1>
                            </div>
                            <div className="h-[81vh] flex items-center justify-center">
                                {/*<h1 className="font-medium text-3xl">Content Preview</h1>*/}
                                <ScrollArea className="h-[80%]">
                                    <PreviewPage key={key} localPage={localPage}/>
                                </ScrollArea>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}
