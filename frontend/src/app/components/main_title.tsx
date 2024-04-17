import { Inter } from "next/font/google";
import { Spotlight } from "./AcernityUI/spotlight";
import { TypewriterEffectSmooth } from "./AcernityUI/type_writer";

const inter = Inter({ subsets: ["latin"] });
const words = [
  {
    text: "Spotlight",
  },
  {
    text: "is",
  },
  {
    text: "the",
  },
  {
    text: "new trend",
  },
  {
    text: "Aceternity.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export default function MainTitle(){
  
    return (
    <div className={`h-[40rem] bg-gradient-to-r from-gray-100 to-slate-100 w-full rounded-md flex md:items-center md:justify-center bg-[#fdfdfd]/[0.96] bg-grid-white/[0.02] overflow-hidden ${inter.className} `}>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="black"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10  w-full pt-20 md:pt-0">
        <div className="flex flex-col items-center justify-center">
        <TypewriterEffectSmooth words={words} />
        </div>
        <p className="mt-4 font-normal max-w-lg text-center mx-auto ">
          Spotlight effect is a great way to draw attention to a specific part
          of the page. Here, we are drawing the attention towards the text
          section of the page. I don&apos;t know why but I&apos;m running out of
          copy.
        </p>
      </div>
    </div>
        
    );
}
 

//text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50  
