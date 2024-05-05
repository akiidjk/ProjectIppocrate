import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import QuestionMark from "@/app/admin/create_page/components/svg/question_mark";
import { Progress } from "@/components/ui/progress"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Separator } from "@/components/ui/separator"

import ConfirmButtons from "@/app/admin/create_page/components/confirm_buttons";
import CreateParagraphDialog from "@/app/admin/create_page/components/create_paragraph_dialog";
import {usePages,Page, Paragraph} from "@/context/page_provider";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import { useToast } from "@/components/ui/use-toast"
import ElementParagraph from "@/app/admin/create_page/components/element_paragraph";
import {ScrollArea} from "@/components/ui/scroll-area";

export default  function Form(){
    const { pages, addPage, addParagraph,addParagraphs, removeParagraph } = usePages();
    const [token,setToken] = useState("");
    const { toast } = useToast()

    useEffect(() => {
        async function fetchSession() {
            const session = await getSession();
            setToken(session?.user?.name ?? 'session not found');
        }
        fetchSession();
    }, []);

    const [localPage, setLocalPage] = useState({
        id: '',
        page: {
            title: '',
            paragraphs: []
        },
        time: new Date().toDateString()
    });

    const handleChange = (newParagraph: Paragraph) => {
        // @ts-ignore
        setLocalPage(prevLocalPage => ({
            ...prevLocalPage,
            page: {
                ...prevLocalPage.page,
                paragraphs: [...prevLocalPage.page.paragraphs, newParagraph]
            }
        }));
    };

    const savePage = () => {
        //Todo Make full check on the content with the function
        addPage(localPage, token);
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
    };

    return (
        <div>
            {/* Input titolo pagina */}

            <div className="w-full flex flex-col">
                <div className="mx-10">
                    <div className="flex">
                        <Label htmlFor="page_title" className="text-[18px]">Titolo pagina</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <QuestionMark color="#4c69c3" size="20px" className="ml-3"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Imposta il titolo della pagina</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Input maxLength={30} onChange={(event) => {
                        localPage.id = event.target.value;
                        localPage.page.title = event.target.value;
                        console.log(localPage)
                    }} type="text" id="title" placeholder="Storia" className="mt-3"/>
                </div>
            </div>

            {/* Inserimento paragrafi */}

            <div className="w-full flex flex-col mt-6">
                <div className="me-auto ms-auto">
                    <div className="flex">
                        <Label htmlFor="page_title" className="text-[18px]">Inserisci paragrafi</Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <QuestionMark color="#4c69c3" size="20px" className="ml-3"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Crea i paragrafi da inserire nella pagina</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <CreateParagraphDialog handle={handleChange}/>

                </div>
            </div>


            <div>
                <div className="flex m-10">
                    <Label htmlFor="page_title" className="text-[16px]">Paragrafi inseriti: </Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <QuestionMark color="#4c69c3" size="20px" className="ml-3"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Qui hai una lista dei paragrafi inseriti nella pagina che puoi eliminare o
                                    visualizzare</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <ScrollArea className="h-[330px]">
                    <ul>
                        {localPage.page.paragraphs.map((paragraph:Paragraph, index) => (
                            <ElementParagraph data={paragraph} key={index} delete={deleteParagraph} index={index}/>
                        ))}
                    </ul>
                </ScrollArea>
            </div>

            <Separator className="my-4 w-3/4 me-auto ms-auto"/>

            {/*<div className="w-2/3 me-auto ms-auto mt-6">*/}
            {/*    <Progress value={33}/>*/}
            {/*</div>*/}

            {/* Button  */}

            <ConfirmButtons save={savePage}/>

        </div>
    )
}