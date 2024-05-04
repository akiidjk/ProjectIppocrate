"use client"
import {createContext, useContext, useState} from "react";


export type Paragraph = {
    title: string;
    content: string;
    image: File
}

type HtmlPage = {
    title: string
    paragraphs: Paragraph[]
}

export type Page = {
    id: string
    HTMLPage: HtmlPage
};


type PagesContextType = {
    pages: Page[];
    addPage: (page: Page) => void;
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

    const addPage = (newPage: Page) => {
        setPages(prevPages => [...prevPages, newPage]);
    };

    const addParagraph = (newParagraph: Paragraph, idPage: string) => {
        setPages(prevPages => prevPages.map(page =>
            page.id === idPage
                ? { ...page, HTMLPage: { ...page.HTMLPage, paragraphs: [...page.HTMLPage.paragraphs, newParagraph] } }
                : page
        ));
    };

    const removeParagraph = (index: number, idPage: string) => {
        setPages(prevPages => prevPages.map(page =>
            page.id === idPage
                ? { ...page, HTMLPage: { ...page.HTMLPage, paragraphs: page.HTMLPage.paragraphs.filter((_, i) => i !== index) } }
                : page
        ));
    };

    const addParagraphs = (newParagraphs: Paragraph[], idPage: string) => {
        setPages(prevPages => prevPages.map(page =>
            page.id === idPage
                ? { ...page, HTMLPage: { ...page.HTMLPage, paragraphs: [...page.HTMLPage.paragraphs, ...newParagraphs] } }
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