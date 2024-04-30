"use client";
import dynamic from "next/dynamic";
import {globeConfig,sampleArcs} from "../../data/data"

const World = dynamic(() => import("./AcernityUI/globe").then((m) => m.World), {
    ssr: false,
  });

export default function MainBody(){


    return(
        <>
            <div className="h-[700px]">
                <div className="float-left w-[50%]">
                    <div className="w-[500px] ms-auto me-auto m-20">
                        <p className="font-normal text-[24px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                        </p>
                    </div>
                    
                </div>               
                <div className="float-right w-[50%] h-[600px]">
                  <World data={sampleArcs} globeConfig={globeConfig} />
                </div>
            </div>
        </>
    )
}
