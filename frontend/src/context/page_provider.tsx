"use client"
import {createContext, useContext, useState} from "react";
import {create_page} from "@/app/api/api";


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
};


type PagesContextType = {
    pages: Page[];
    addPage: (page: Page,token:string) => void;
    addParagraph: (newParagraph: Paragraph, idPage: string) => void;
    removeParagraph: (index: number, idPage: string) => void;
    addParagraphs: (newParagraphs: Paragraph[], idPage: string) => void;
};

const defaultPagesContext: PagesContextType = {
    pages: [],
    addPage: () => {},
    addParagraph: () => {},
    removeParagraph: () => {},
    addParagraphs: () => {},
};

const PagesContext = createContext<PagesContextType>(defaultPagesContext);

export const PagesProvider = ({ children }: { children: React.ReactNode }) => {
    const [pages, setPages] = useState<Page[]>([]);

    const addPage = (newPage: Page,token:string) => {
        setPages(prevPages => [...prevPages, newPage]); //Locally
        console.log(newPage)
        create_page(token, newPage).then(r => { //DB
            console.log("RICHIESTA INVIATA")
        })
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
        <PagesContext.Provider value={{ pages, addPage, addParagraph, removeParagraph, addParagraphs }}>
            {children}
        </PagesContext.Provider>
    );
};

export const usePages = () => useContext(PagesContext);