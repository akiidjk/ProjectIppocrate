import Link from "next/link";
import Navbar from "../components/navbar";

export default function Credits(){
    return(
        <>
            <Navbar/>
            <div className="bg-[#4369c3] flex h-[300px]">
                <div className="my-auto me-auto ms-auto">    
                    <h1 className="text-center text-[#fdfdfd] text-7xl font-bold">
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
                        <p className="text-left m-4">il sito è stato progettato ed ideato da Francesco Memoli, Giuseppe Pio Vicedomini, Daniele Migliore, Rosario Viscardi e Enrico Cipolletta </p>
                        <p className="text-left m-4">Elenco delle risorse utilizzate per la realizzazione del sito web:</p>
                        
                        <ul className="text-left ml-4 list-disc list-inside">
                            <li>Framework-Frontend: <Link target="_blank" href="https://nextjs.org/"  className="text-sky-700 hover:underline">NextJs</Link></li>
                            <li>Framework-Backend: <Link target="_blank" href="https://actix.rs/"  className="text-sky-700 hover:underline">Actix</Link></li>
                            <li>Database usato: <Link target="_blank" href="https://redis.io/"  className="text-sky-700 hover:underline">Redis</Link></li>
                        </ul>: 
                    </div>
                    <div className="shadow"><p className="text-left m-4">Il sito Salute e Benessere è stato creato per descrivere il terzo obiettivo dell&apos;  agenda 2030 da cui prende il nome il sito: &ldquo;Salute e Benessere&ldquo;. Ognuno si è occupato di un aspetto differennte per la sua realizazzione: Daniele si è occupato del backend gestendo il caricamento delle pagine dinamiche sfruttando il database, Giuseppe si è occupato del frontend e quindi di come dovesse apparire, Enrico e Rosario hanno procurato il materiale da inserire per ogni materia e infine Francesco ha gestito e organizzato il team aiutando singolarmente chi avesse bisogno. Un ringraziemento va anche alla fidanzata di Franco che ha creato il logo </p></div>
                </div>

            </div>
        </>
        
    )
}