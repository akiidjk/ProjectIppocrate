"use client"
import { Page, usePages } from "@/context/page_provider";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import Loader from "@/app/components/loader";
import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";
import NotFound from "@/app/not-found";

const inter = Inter({ subsets: ["latin"] });

export default function PageTemplate({ params }: { params: { pageId: string } }) {
    const { pages,status } = usePages();
    const [pageTarget, setPageTarget] = useState<Page | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);
    useEffect(() => {
        if(status == "active"){
            const foundPage = pages.find(page => page.id === params.pageId);
            if (foundPage) {
                setPageTarget(foundPage);
                document.title = foundPage.page.title;
                setNotFound(false);
            } else {
                setNotFound(true);
            }
        }
    }, [pages, params.pageId, status]);

    if (notFound) {
        return <NotFound />;
    }

    if (status == "loading" || !pageTarget) {
        return <Loader />;
    }


    return (
        <div>
            <Navbar />
            <div className="ml-12 mr-12 flex flex-col items-center justify-center">
                <h1 className={cn(`lg:text-[138px] sm:text-[60px]  ${inter.className} font-bold relative z-20`)}>
                    {/* @ts-ignore */}
                    {pageTarget.page.title}
                </h1>
            </div>
            <div className="flex">
                <div className="w-[95%] ms-auto me-auto">
                    {/* @ts-ignore */}
                    {pageTarget.page.paragraphs.map((paragraph, index) => (
                            <Paragraph key={index} paragraph={paragraph} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

function Paragraph({ paragraph }: { paragraph: any }) {
    switch (paragraph.layout_type) {
        case 1:
            return <Layout1 paragraph={paragraph} />;
        case 2:
            return <Layout2 paragraph={paragraph} />;
        case 3:
            return <Layout3 paragraph={paragraph} />;
        case 4:
            return <Layout4 paragraph={paragraph} />;
        case 5:
            return <Layout5 paragraph={paragraph} />;
        default:
            return null;
    }
}

function Layout1({ paragraph }: { paragraph: any }) {
    return (
        <div className="m-20">
            <div className="mt-20 flex">
                <div className="items-center flex float-left min-w-[60%] image-container" dangerouslySetInnerHTML={{ __html: paragraph.image_sources[0] }} />
                <div className="float-right mr-12 ml-4 max-w-[30%]">
                    <div dangerouslySetInnerHTML={{ __html: paragraph.title }} />
                    <div className="break-all" dangerouslySetInnerHTML={{ __html: paragraph.content }} />
                </div>
            </div>
        </div>
    );
}

function Layout2({ paragraph }: { paragraph: any }) {
    return (
        <div className="m-20">
            <div className="mt-20 flex">
                <div className="w-[70%] float-right ml-4 mr-4">
                    <div dangerouslySetInnerHTML={{ __html: paragraph.content }} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: paragraph.image_sources[0] }} />
            </div>
        </div>
    );
}

function Layout3({ paragraph }: { paragraph: any }) {
    return (
        <div className="m-20">
            <div className="flex">
                <div className="ms-auto me-auto">
                    <div dangerouslySetInnerHTML={{ __html: paragraph.title }} />
                    <div dangerouslySetInnerHTML={{ __html: paragraph.content }} />
                </div>
            </div>
        </div>
    );
}

function Layout4({ paragraph }: { paragraph: any }) {
    return (
        <div className="m-20">
            <div className="mt-20 flex">
                <div className="float-right mr-12 ml-4 max-w-[30%]">
                    <div dangerouslySetInnerHTML={{ __html: paragraph.title }} />
                    <div className="break-all" dangerouslySetInnerHTML={{ __html: paragraph.content }} />
                </div>
                <div className="items-center flex float-left min-w-[60%] image-container" dangerouslySetInnerHTML={{ __html: paragraph.image_sources[0] }} />
            </div>
        </div>
    );
}

function Layout5({ paragraph }: { paragraph: any }) {
    return (
        <div className="m-20">
            <div className="mt-20 flex">
                <div dangerouslySetInnerHTML={{ __html: paragraph.image_sources[0] }} />
                <div className="w-[70%] float-right ml-4 mr-4">
                    <div dangerouslySetInnerHTML={{ __html: paragraph.content }} />
                </div>
            </div>
        </div>
    );
}