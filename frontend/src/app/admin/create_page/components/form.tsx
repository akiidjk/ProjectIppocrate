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
import {Button} from "@/components/ui/button";
import Plus from "@/app/admin/create_page/components/svg/plus";
import { Separator } from "@/components/ui/separator"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useToast } from "@/components/ui/use-toast"

export default  function Form(){
    const { toast } = useToast()

    return (
        <div>
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
                    <Input type="text" id="title" placeholder="Storia" className="mt-3"/>
                </div>
            </div>

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
                    <div className="flex">
                        <Button onClick={() => console.log("ADD")} variant="ghost" size="icon" className="ms-auto mt-3 me-auto bg-[#fdfdfd]">
                            <Plus color={"#18181b"} size={"30px"}/>
                        </Button>
                    </div>
                </div>
            </div>
            <Separator className="my-4 w-3/4 me-auto ms-auto"/>
            <div className="w-2/3 me-auto ms-auto mt-6">
                <Progress value={33}/>
            </div>

            <div className="flex">
                <div className="ms-auto">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="mt-5 mr-5">Ripristina</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sei assolutamente sicuro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Questa azione non può essere annullata. L&apos; operazione eliminerà definitivamente il vostro
                                    progresso di creazione.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>No meglio di no</AlertDialogCancel>
                                <AlertDialogAction className="bg-[#f05656] hover:bg-[#ff665b]">Si ripristina!</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="mt-5 mr-5">Salva</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sei assolutamente sicuro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Confermando metti fine al processo di creazione non potrai piu modificare la pagina ma solo eliminarla succesivamente
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>No meglio di no</AlertDialogCancel>
                                <AlertDialogAction onClick={() => {  {/*Implement the logic*/}
                                    toast({
                                                    className:"bg-[#3aba6f] text-[#fdfdfd]",
                                                    description: "Pagina salvata e inviata con successo",
                                                })
                                            }}>
                                            Si salva!
                                    </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

        </div>
    )
}