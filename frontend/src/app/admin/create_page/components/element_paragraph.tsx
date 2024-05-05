import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    delete: Function
    index: number
    data: Paragraph
}
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Info, Trash2 } from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Paragraph} from "@/context/page_provider";
import {Label} from "@/components/ui/label";


const MAX_LENGHT_HOVER = 40
const MAX_LENGHT_TITLE = 10
export default  function ElementParagraph(props:Props){
    return (
        <div className="m-4">
            <Card className="h-[80px]">
                <CardHeader>
                    <div className="flex justify-between">
                    <h1 className="text-[18px] mt-1">{props.data.title.length > MAX_LENGHT_TITLE ? props.data.title.slice(0,MAX_LENGHT_TITLE) + '...' : props.data.title}</h1>
                        <div className="flex">
                            <Button onClick={() => {
                                props.delete(props.index)
                            }}  size="icon" variant="ghost">
                                <Trash2 className="size-[24px] stroke-red-600"/>
                            </Button>

                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button className=""  size="icon" variant="ghost">
                                        <Info className="size-[24px] stroke-blue-600"/>
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-[580px]">
                                    <div className="w-[580px]">
                                        <h1 className="text-2xl m-2 font-bold">Dettagli del paragrafo: </h1>
                                        <div className="flex">
                                            <h2 className="text-xl m-2 font-semibold text-gray-900">
                                                Titolo:
                                            </h2>
                                            <p className="text-gray-600 mt-3">
                                                { props.data.title.length > MAX_LENGHT_HOVER ? props.data.title.slice(0,MAX_LENGHT_HOVER) + '...' : props.data.title}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <h2 className="text-xl m-2 font-semibold text-gray-900">
                                                Contenuto:
                                            </h2>
                                            <p className="text-gray-600 mt-3 text-wrap	">
                                                { props.data.content.length > MAX_LENGHT_HOVER ? props.data.content.slice(0,MAX_LENGHT_HOVER) + '...' : props.data.content}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <h2 className="text-xl m-2 font-semibold text-gray-900">
                                                Immagine:
                                            </h2>
                                            <p className="text-gray-600 mt-3">
                                                {props.data.image_sources}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            <h2 className="text-xl m-2 font-semibold text-gray-900">
                                                Layout:
                                            </h2>
                                            <p className="text-gray-600 mt-3">
                                                {props.data.layout_type}
                                            </p>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}