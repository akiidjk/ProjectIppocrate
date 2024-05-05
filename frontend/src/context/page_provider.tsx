"use client"
import {createContext, useContext, useEffect, useState} from "react";
import {create_page, get_pages, remove_page} from "@/app/api/api";


export type Paragraph = {
    title: string;
    content: string;
    image_sources: string[]
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
    addPage: (page: Page,token:string) => void;
    addParagraph: (newParagraph: Paragraph, idPage: string) => void;
    removeParagraph: (index: number, idPage: string) => void;
    addParagraphs: (newParagraphs: Paragraph[], idPage: string) => void;
    remove_page_by_index: (token:string,index: number) => void;
};

const defaultPagesContext: PagesContextType = {
    pages: [],
    addPage: () => {},
    addParagraph: () => {},
    removeParagraph: () => {},
    addParagraphs: () => {},
    remove_page_by_index: ()=> {},
};

const PagesContext = createContext<PagesContextType>(defaultPagesContext);


export const PagesProvider = ({ children }: { children: React.ReactNode }) => {

    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        get_pages().then(fetchedPages => {
            setPages(fetchedPages);  // Assumi che `fetchedPages` sia già nel formato corretto
        }).catch(error => console.error("Error fetching pages:", error));
    }, []);

    const addPage = (newPage: Page,token:string) => {
        setPages(prevPages => [...prevPages, newPage]); //Locally
        console.log(newPage)
        create_page(token, newPage).then(r => { //DB
            console.log("RICHIESTA INVIATA")
        })
    };

    const remove_page_by_index = (token:string,index: number) => {
        let name_page = pages[index].id
        console.log(name_page)
        setPages(prevPages => [
            ...prevPages.slice(0, index),
            ...prevPages.slice(index + 1)
        ]);
        remove_page(token,name_page)
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
        <PagesContext.Provider value={{ pages, addPage,remove_page_by_index, addParagraph, removeParagraph, addParagraphs }}>
            {children}
        </PagesContext.Provider>
    );
};

export const usePages = () => useContext(PagesContext);