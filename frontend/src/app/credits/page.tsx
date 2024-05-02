import Navbar from "../components/navbar";
import Image  from "next/image"
export default function Credits(){
    return(
        <>
            <Navbar/>
            {/* bg-[url('/salute.png')] */}
            <div className="bg-[#4369c3] flex h-[350px]">
                <div className="my-auto me-auto ms-auto">    
                    <h1 className="text-center text-[#fdfdfd] text-7xl">
                            Credits
                    </h1>
                    
                </div> 
            </div>

            <div className="text-center m-8 ">
                <div className="" >
                    <p className="text-2xl"><strong>Credits</strong>. Elenco delle risorse utilizzate</p> 
                </div>
                <div className=" grid grid-cols-2 gap-4 m-8 ">
                    <div className="shadow">
                        <p className="text-left">l sito stocazzo è stato progettato ed ideato da.. </p>
                        <p className="text-left line-clamp-3">Elenco delle risorse utilizzate per la realizzazione del sito web:</p>
                        
                        <ul className="list-inside">
                            <li>Framework:</li>
                            <li>Mimmo</li>
                            <li>sei </li>
                            <li>gay</li>
                        </ul>
                    </div>
                    <div className="shadow"><p>il sito </p></div>
                </div>

            </div>
        </>
        
    )
}