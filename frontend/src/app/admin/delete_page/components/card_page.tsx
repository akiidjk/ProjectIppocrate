import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import {Page, usePages} from "@/context/page_provider";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

interface Props {
    data: Page,
    index: number,
    delete: Function,
}

export default function CardPage(props: Props) {

    return (
        <div className="m-5">
            <Card>
                <CardHeader>
                    <CardTitle>{props.data.page.title}</CardTitle>
                    <CardDescription>{props.data.time}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <div className="flex justify-between">

                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button>
                                    <Trash2 className="size-[24px]"/>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Sei assolutamente sicuro</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Questo cancellare permanetemente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Meglio di no
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={() => {
                                        props.delete(props.index)
                                    }}>
                                        Continua
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}