"use client"
import { Page, usePages } from "@/context/page_provider";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import Loader from "@/app/components/loader";
import {cn} from "@/utils/cn";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function PageTemplate({ params }: { params: { pageId: string }; }) {
    const { pages } = usePages();
    const [pageTarget, setPageTarget] = useState<Page | null>(null);

    useEffect(() => {
        const foundPage = pages.find(page => page.id === params.pageId);

        if (foundPage) {
            setPageTarget(foundPage);
            document.title = foundPage.page.title;
        }
    }, [pages, params.pageId]);

    if (!pages || pages.length === 0 || !pageTarget) {
        return <Loader />;
    }

    return (
        <div>
            <Navbar />
            <div className="ml-12 mr-12 flex flex-col items-center justify-center">
                <h1 className={cn(`lg:text-[138px] sm:text-[60px]  ${inter.className} font-bold relative z-20`)}>
                    {pageTarget.page.title}
                </h1>
            </div>
            {
                pageTarget.page.paragraphs.map((paragraph, index) => {
                    return get_paragraf(paragraph.layout_type,paragraph.title,paragraph.content,paragraph.image_sources[0],index)
                })
            }
        </div>
    );
}


function get_paragraf(layout:number,title:string,content:string,image_source:string,key:number){
    switch(layout){
        case 1:
        case 4:
            if(layout == 1){
                return (
                    <div key={key}>
                        <div className="mt-20 flex">
                            <div dangerouslySetInnerHTML={{__html: image_source}}/>
                            <div className="w-[30%] float-right  mr-12 ml-4">
                                <div dangerouslySetInnerHTML={{__html: title}}/>
                                <div dangerouslySetInnerHTML={{__html: content}}/>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={key}>
                        <div className="mt-20 flex">
                            <div className="w-[30%] float-right  mr-12 ml-4">
                                <div dangerouslySetInnerHTML={{__html: title}}/>
                                <div dangerouslySetInnerHTML={{__html: content}}/>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: image_source}}/>
                        </div>
                    </div>
                )
            }

        case 2:
        case 5:
            if (layout == 2) {
                return (
                    <div key={key}>
                        <div className="mt-20 flex">
                            <div className="w-[70%] float-right  ml-12 mr-4">
                                <div dangerouslySetInnerHTML={{__html: content}}/>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: image_source}}/>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={key}>
                        <div className="mt-20 flex">
                            <div dangerouslySetInnerHTML={{__html: image_source}}/>

                            <div className="w-[70%] float-right  ml-12 mr-4">
                                <div dangerouslySetInnerHTML={{__html: content}}/>
                            </div>
                        </div>
                    </div>
                )
            }
        case 3:
            return (
                <div key={key}>
                    <div className="flex m-28">
                        <div className="ms-auto me-auto">
                            <div dangerouslySetInnerHTML={{__html: title}}/>
                            <div dangerouslySetInnerHTML={{__html: content}}/>
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div key={key}></div>
            )
    }
}