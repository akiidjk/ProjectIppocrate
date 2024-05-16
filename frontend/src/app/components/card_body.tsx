import Image from "next/image"
import { BentoGrid, BentoGridItem } from "./AcernityUI/bentogrid"
import ButtonSeeMore from "./button_see_more";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

interface Props {
    src: string
    url:string
}

const Skeleton = (props:Props) => (
  <a href={props.url} className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
              <Image
                  width={1000}
                  height={1000}
                  className="object-cover"
                  src={props.src} alt={"image"}        
              />
      </div>
  </a>
);

export const items_bentobox = [
  {
    title: "Cambiamenti moderni nel concetto di salute.",
    description: "Societa antica, medievale e moderna",
    header: <Skeleton src="/storia.jpg" url="#" />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "L’Istat: stile di vita e salute.",
    description: "L’importanza della prevenzione.",
    header: <Skeleton src="/istat.png" url="#"  />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "I pericoli delle dipendenze",
    description: "I pericoli delle dipendenze e i rischi legati all'assunzione di sostanze stupefacenti",
    header: <Skeleton src="/dipendenze.jpeg" url="#"  />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Confrontarsi con la proposta cristiana",
    description:
      "Riconoscendone l’originale contributo per la realizzazione di un mondo più umano.",
    header: <Skeleton src="/christian.jpg" url="#"  />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];

export default function BodyCard(){
    return(
        <>
            <div className="mt-100 w-[100%]">
                <div className="">
                    <h1 className="font-bold text-center  text-[50px]">Comincia a vedere questo...</h1>
                </div>
                <BentoGrid className="max-w-4xl m-20 mx-auto md:auto-rows-[20rem]">
                    {items_bentobox.map((item, i) => (
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

