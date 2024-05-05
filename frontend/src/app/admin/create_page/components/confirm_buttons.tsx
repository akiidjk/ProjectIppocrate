import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";


interface ConfirmButtonsProps {
    save?: () => void
}

export default function ConfirmButtons({save}: ConfirmButtonsProps) {
    const {toast} = useToast()


    return (
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
                                Questa azione non può essere annullata. L&apos; operazione eliminerà definitivamente il
                                vostro
                                progresso di creazione.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>No meglio di no</AlertDialogCancel>
                            <AlertDialogAction className="bg-[#f05656] hover:bg-[#ff665b]">Si
                                ripristina!</AlertDialogAction>
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
                                Confermando metti fine al processo di creazione non potrai piu modificare la pagina ma
                                solo eliminarla succesivamente
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>No meglio di no</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                if (save) {
                                    save()
                                }
                                toast({
                                    className: "bg-[#3aba6f] text-[#fdfdfd]",
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
    )
}