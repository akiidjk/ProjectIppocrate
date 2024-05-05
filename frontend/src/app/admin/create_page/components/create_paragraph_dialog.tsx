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


interface CreateParagraphDialogProps {
    handle: (NewParagraph: any) => void
}

export default function CreateParagraphDialog({handle}: CreateParagraphDialogProps) {
    const save = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let titlePicture = formData.get("picture");

        if (titlePicture instanceof File) {
            handle({
                title: formData.get("paragrah_title"),
                content: formData.get("paragrah_content"),
                image_sources: [titlePicture ? titlePicture.name : undefined],
                layout_type: 1, //temporary to create the field
                })
            }
        }

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
                                <Input type="text" name="paragrah_title" id="paragrah_title"
                                       placeholder="Lo svillupo del benessere"/>
                            </div>
                            <div>
                                <Label htmlFor="paragrah_content">Contenuto paragrafo</Label>
                                <Textarea maxLength={2000} name="paragrah_content" className="max-h-80"
                                          placeholder="Bla bla bla" id="paragrah_content"/>
                            </div>
                            <div>
                                <Label htmlFor="picture">Immagine</Label>
                                <Input id="picture" type="file" name="picture"/>
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