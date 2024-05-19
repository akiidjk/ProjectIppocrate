"use client"
import {createContext, useContext, useEffect, useState} from "react";
import {FileStringTuple, create_page, get_pages, remove_page, upload_image} from "@/app/api/api";


export type Paragraph = {
    title: string;
    content: string;
    image_source: string
    layout_type: number
}

type HtmlPage = {
    title: string
    paragraphs: Paragraph[]
}

export type Page = {
    id: string
    page: HtmlPage
    time:string
};


type PagesContextType = {
    pages: Page[];
    status: Status;
    toEdit: null | Page;
    setToEdit: (edit: null | Page) => void
    addPage: (page: Page,token:string,files: FileStringTuple[]) => Promise<number>;
    addParagraph: (newParagraph: Paragraph, idPage: string) => void;
    removeParagraph: (index: number, idPage: string) => void
    addParagraphs: (newParagraphs: Paragraph[], idPage: string) => void;
    remove_page_by_index: (token:string,index: number) => Promise<number>;
};
type Status = "active" | "loading" | "inactive";


const defaultPagesContext: PagesContextType = {
    pages: [],
    status: "inactive",
    toEdit: null,
    setToEdit: () => {},
    addPage: async  () => {return 1},
    addParagraph: () => {},
    removeParagraph:   () => {},
    addParagraphs: () => {},
    remove_page_by_index: async ()=> {return 1},
};

const PagesContext = createContext<PagesContextType>(defaultPagesContext);


export const PagesProvider = ({ children }: { children: React.ReactNode }) => {

    const [pages, setPages] = useState<Page[]>([]);
    const [status, setStatus] = useState<Status>("inactive");
    const [toEdit, setToEdit] = useState<Page | null>(null);

    useEffect(() => {
        setStatus("loading")
        get_pages().then(fetchedPages => {
            setPages(fetchedPages);
            setStatus("active")
        }).catch(error => console.error("Error fetching pages:", error));
    }, []);

    const addPage = async (newPage: Page, token: string, files: FileStringTuple[]) => {
        try {
            // @ts-ignore
            setPages(prevPages => {
                // @ts-ignore
                if(prevPages !== 300) {
                    return [...prevPages, newPage];
                } else {
                    return 300;
                }
            });

            const result_code = await create_page(token, newPage);
            const result_code_upload = await upload_image(token, files);

            if (result_code !== 200 || result_code_upload !== 200) {
                return 300;
            } else {
                return 200;
            }
        } catch (error) {
            console.error("Errore durante l'aggiunta della pagina:", error);
            return 300;
        }
    };


    const remove_page_by_index = async (token: string, index: number) => {
        let name_page = pages[index].id
        setPages(prevPages => [
            ...prevPages.slice(0, index),
            ...prevPages.slice(index + 1)
        ]);
        let result = await remove_page(token, name_page)

        if (result != 200) {
            return 300;
        } else {
            return 200
        }

    };

    const addParagraph = (newParagraph: Paragraph, idPage: string) => {
        setPages(prevPages => prevPages.map(page =>
            page.id === idPage
                ? { ...page, page: { ...page.page, paragraphs: [...page.page.paragraphs, newParagraph] } }
                : page
        ));
    };

    const removeParagraph = (index: number, idPage: string) => {
        setPages(prevPages => prevPages.map(page =>
            page.id === idPage
                ? { ...page, page: { ...page.page, paragraphs: page.page.paragraphs.filter((_, i) => i !== index) } }
                : page
        ));
    };

    const addParagraphs = (newParagraphs: Paragraph[], idPage: string) => {
        setPages(prevPages => prevPages.map(page =>
            page.id === idPage
                ? { ...page, page: { ...page.page, paragraphs: [...page.page.paragraphs, ...newParagraphs] } }
                : page
        ));
    };

    return (
        <PagesContext.Provider value={{ pages, addPage,remove_page_by_index, addParagraph, removeParagraph, addParagraphs, status, toEdit,setToEdit}}>
            {children}
        </PagesContext.Provider>
            );
};

export const usePages = () => useContext(PagesContext);