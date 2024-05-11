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
import {Page, Paragraph} from "@/context/page_provider";
import ElementParagraph from "@/app/admin/create_page/components/element_paragraph";
import {ScrollArea} from "@/components/ui/scroll-area";



interface Props {
    localPage: Page
    handleParagraph: Function
    deleteParagraph: Function
    savePage: Function
    handleImage:Function
}


export default  function Form(props: Props){

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
                        props.localPage.id = (event.target.value as string).trim().replace(/\s+/g, '').toLowerCase();
                        props.localPage.page.title = event.target.value;
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

                    <CreateParagraphDialog handleImage={props.handleImage} handle={props.handleParagraph}/>

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
                        {props.localPage.page.paragraphs.map((paragraph:Paragraph, index) => (
                            <ElementParagraph data={paragraph} key={index} delete={props.deleteParagraph} index={index}/>
                        ))}
                    </ul>
                </ScrollArea>
            </div>

            <Separator className="my-4 w-3/4 me-auto ms-auto"/>

            {/*<div className="w-2/3 me-auto ms-auto mt-6">*/}
            {/*    <Progress value={33}/>*/}
            {/*</div>*/}

            {/* Button  */}

            <ConfirmButtons save={props.savePage}/>

        </div>
    )
}