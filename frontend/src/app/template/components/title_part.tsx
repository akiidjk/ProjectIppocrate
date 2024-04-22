import { Boxes } from "@/components/AcernityUI/background-boxes";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function TitlePart(){
    return (
        <div className="h-96 relative w-full overflow-hidden  ml-12 mr-12 bg-slate-900 flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />
            <h1 className={cn(`text-[130px]  ${inter.className} font-bold text-[#fdfdfd] relative z-20`)}>
                Titolo 1
            </h1>
            <p className="text-center mt-2 text-neutral-300 relative z-20">
                Sotto titolo
            </p>
        </div>
    )
}