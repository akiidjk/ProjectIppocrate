import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Props {
    title:string,
    subtitle:string
}

export default function TitlePart(props:Props){
    return (
        <div className="h-96 relative w-full overflow-hidden  ml-12 mr-12 flex flex-col items-center justify-center rounded-lg">
            <h1 className={cn(`text-[138px]  ${inter.className} font-bold relative z-20`)}>
                {props.title}
            </h1>
            <p className="text-center mt-2 relative z-20">
            {props.subtitle}
            </p>
        </div>
    )
}