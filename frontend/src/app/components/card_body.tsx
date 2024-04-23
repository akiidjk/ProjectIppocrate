import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "../utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "./AcernityUI/bentogrid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import ButtonSeeMore from "./button_see_more";

interface Props {
    src: string
    h:number
    w:number
    url:string
}

const Skeleton = (props:Props) => (
    <a href={props.url} className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
            
                <Image
                    width={props.w}
                    height={props.h}
                    src={props.src} alt={"image"}        
                />
            
        </div>
    </a>
  );
  const items = [
    {
      title: "Storia",
      description: "Agenda 2030 molto storica",
      header: <Skeleton src="/img1.jpg" h={500} w={1000} url="#" />,
      className: "md:col-span-2",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Informatica",
      description: "Informatica nel benessere",
      header: <Skeleton src="/img2.jpg" h={500} w={1000} url="#"  />,
      className: "md:col-span-1",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Pippo pluto e paperino",
      description: "Non ti scordare del gabibbo",
      header: <Skeleton src="/img3.jpg" h={500} w={1000} url="#"  />,
      className: "md:col-span-1",
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Power of Communication",
      description:
        "Understand the impact of effective communication in our lives.",
      header: <Skeleton src="/gabibboo_navbar.jpg" h={500} w={500} url="#"  />,
      className: "md:col-span-2",
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
  ];


export default function BodyCard(){
    return(
        <>
            <div className="mt-100 w-[100%]">

                <div className="">
                    <h1 className="font-bold text-center  text-[50px]">   Start to see this</h1>
                </div>


                <BentoGrid className="max-w-4xl m-20 mx-auto md:auto-rows-[20rem]">
                    {items.map((item, i) => (
                        <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={item.className}
                        icon={item.icon}
                        />
                    ))}
                    </BentoGrid>
                    <ButtonSeeMore/>
            </div>
        </>
    )
}

