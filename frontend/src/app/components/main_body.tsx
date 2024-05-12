"use client";
import dynamic from "next/dynamic";
import {globeConfig,sampleArcs} from "@/data/data"

const World = dynamic(() => import("./AcernityUI/globe").then((m) => m.World), {
    ssr: false,
  });

export default function MainBody(){


    return(
        <>
            <div className="h-[700px]">
                <div className="float-left w-[50%] mt-5">
                    <div className="w-[700px] ms-auto me-auto m-20">
                        {/*SDG = Sustainable Development Goals */}
                        <h2 className="mb-4 text-[36px] font-bold"> L&apos;obbietivo 3 </h2> 
                        <p className="font-normal text-[24px] text-left">
                            L&apos;Obiettivo 3 di questi SDGs si focalizza sulla salute e il benessere e ha lo scopo di &ldquo;garantire una vita sana e promuovere il benessere per tutti a tutte le età&ldquo;. Questo obiettivo include una serie di traguardi specifici che spaziano dal ridurre la mortalità materna e neonatale, combattere malattie come l&apos;AIDS, la tubercolosi, la malaria e altre malattie trasmissibili, fino alla promozione della salute mentale e del benessere. Inoltre, punta a garantire l&apos;accesso universale a servizi sanitari di qualità, compresa la protezione sanitaria universale, i medicinali e i vaccini essenziali
                        </p>
                    </div>
                    
                </div>               
                <div className="float-right w-[50%] h-[600px]">
                  <World data={sampleArcs} globeConfig={globeConfig} />
                </div>
            </div>
        </>
    )
}
