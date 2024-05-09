import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter, DialogClose
} from "@/components/ui/dialog"
import Plus from "@/app/admin/create_page/components/svg/plus";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import React from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

interface CreateParagraphDialogProps {
    handle: Function
    handleImage:Function
}

// const PATH_IMAGE = "http://localhost:8000/api/get_image/"
const PATH_IMAGE = "http://backend/api/get_image/"
export default function CreateParagraphDialog(props: CreateParagraphDialogProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedLayout, setSelectedLayout] = React.useState<Layout | null>(
        null
    )
    const { toast } = useToast()


    const save = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let picture = formData.get("picture");

        if(picture){
            // @ts-ignore
            props.handleImage([picture,picture.name])
        }

        if(formData.get("paragrah_title") === null || formData.get("paragrah_title") === ''){
            toast({
                variant:"destructive",
                title: "Errore nel form",
                description: "Ricordati di inserire il titolo prima di salvare",
            })
            return
        }else if(formData.get("paragrah_content") === null || formData.get("paragrah_content") === ''){
            toast({
                variant:"destructive",
                title: "Errore nel form",
                description: "Ricordati di inserire del contenuto prima di salvare",
            })
            return
        } else { // @ts-ignore
            if(selectedLayout === '' || selectedLayout === null){
                        toast({
                            variant:"destructive",
                            title: "Errore nel form",
                            description: "Ricordati di specificare un layout prima di salvare",
                        })
                        return
                    }else{
                        if (picture instanceof File) {
                            props.handle({
                                title: formData.get("paragrah_title"),
                                content: formData.get("paragrah_content"),
                                image_sources: [picture ? PATH_IMAGE + "image-" + picture.name : undefined],
                                layout_type: parseInt(selectedLayout?.value as string), //temporary to create the field
                            })
                        }
                        toast({
                                className: "bg-[#3aba6f] text-[#fdfdfd]",
                                description: "Paragrafo salvata e inviata con successo",
                            })
                    }
        }
        }

    type Layout = {
        value: string
        label: string
    }

    //Todo change label with small description
    const Layouts: Layout[] = [
        {
            value: "1",
            label: "1",
        },
        {
            value: "2",
            label: "2",
        },
        {
            value: "3",
            label: "3",
        },
        {
            value: "4",
            label: "4",
        },
        {
            value: "5",
            label:  "5",
        },
    ]

        return (
            <div className="flex">
                <Dialog>
                    <DialogTrigger asChild className="ms-auto mt-3 me-auto bg-[#fdfdfd]">
                        <Button variant="ghost" size="icon">
                            <Plus color={"#18181b"} size={"30px"}/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Crea il paragrafo</DialogTitle>
                            <DialogDescription>
                                Crea un paragrafo da inserire nella pagina; Gli spazi da compilari
                                segnati &apos;*&apos; sono opzionali
                            </DialogDescription>
                        </DialogHeader>
                        <form className="my-8" onSubmit={save}>
                            <div>
                                <div>
                                    <Label htmlFor="paragrah_title">Titolo paragrafo</Label>
                                    <Input maxLength={40} type="text" name="paragrah_title" id="paragrah_title"
                                           placeholder="Lo svillupo del benessere"/>
                                </div>
                                <div>
                                    <Label  htmlFor="paragrah_content">Contenuto paragrafo</Label>
                                    <Textarea maxLength={2000} name="paragrah_content" className="max-h-80"
                                              placeholder="Bla bla bla" id="paragrah_content"/>
                                </div>
                                <div>
                                    <Label htmlFor="picture">Immagine</Label>
                                    <Input id="picture" type="file" name="picture"/>
                                </div>
                                <div>
                                    <p className="text-sm my-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Layout</p>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-[150px] justify-start"
                                            >
                                                {selectedLayout ? (
                                                    <>
                                                        {selectedLayout.label}
                                                    </>
                                                ) : (
                                                    <>+ Set layout</>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0" side="right" align="start">
                                            <Command>
                                                <CommandInput placeholder="Change layout..."/>
                                                <CommandList>
                                                    <CommandEmpty>No results found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {Layouts.map((status) => (
                                                            <CommandItem
                                                                key={status.value}
                                                                value={status.value}
                                                                onSelect={(value) => {
                                                                    setSelectedLayout(
                                                                        Layouts.find((priority) => priority.value === value) ||
                                                                        null
                                                                    )
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                <span>{status.label}</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <DialogFooter>
                                <div className="flex">
                                    <DialogClose asChild>
                                        <Button className="mr-4" variant="outline">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="submit">
                                            Save
                                        </Button>
                                    </DialogClose>
                                </div>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }