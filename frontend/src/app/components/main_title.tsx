import { Inter } from "next/font/google";
import { Spotlight } from "./AcernityUI/spotlight";
import { TypewriterEffectSmooth } from "./AcernityUI/type_writer";

const inter = Inter({ subsets: ["latin"] });
const words = [
  {
    text: "Obiettivo",
    className: "text-[70px]",
  },
  {
    text: "Salute",
    className: "text-[#4e69c3] text-[70px]",

  },
  {
    text: "e",
    className: "text-[70px]",
  },
  {
    text: "Benessere",
    className: "text-[#4e69c3] text-[70px]",
  },
];

export default function MainTitle(){
  
    return (
    <div className={`h-[40rem] bg-gradient-to-r from-gray-100 to-slate-100 w-full rounded-md flex md:items-center md:justify-center bg-[#fdfdfd]/[0.96] bg-grid-white/[0.02] overflow-hidden ${inter.className}`}>
      <Spotlight
        className="z-0 -top-40 left-0 md:left-60 md:-top-20"
        fill="black"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-0 w-full pt-20 md:pt-0">
        <div className="flex flex-col items-center justify-center">
          <TypewriterEffectSmooth words={words} cursorClassName="bg-[#4e69c3] xl:h-[70px]" />
        </div>
        <p className="mt-4 font-normal max-w-lg text-center mx-auto ">
          L&apos;Agenda 2030 per lo Sviluppo Sostenibile è un piano d&apos;azione globale adottato dai membri delle Nazioni Unite nel settembre 2015.
        </p>
      </div>
    </div>
        
    );
}
 

//text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50  
