import Link from "next/link";
import Navbar from "../components/navbar";

export default function Credits(){
    return(
        <>
            <Navbar/>
            <div className="bg-[#4369c3] flex h-[350px]">
                <div className="my-auto me-auto ms-auto">    
                    <h1 className="text-center text-[#fdfdfd] text-7xl font-bold">
                            Credits
                    </h1>
                    
                </div> 
            </div>

            <div className="text-center m-8 ">
                <div className="m-[50px]" >
                    <p className="text-2xl"><strong>Credits</strong>. Elenco delle risorse utilizzate</p> 
                </div>
                <div className=" grid grid-cols-2 gap-12 m-[90px] ">
                    <div className="shadow">
                        
                        <p className="text-left m-4">il sito è stato progettato ed ideato da Francesco Memoli, Giuseppe Pio Vicedomini, Daniele Migliore, Rosario Viscardi e Enrico Cipolletta </p>
                        <p className="text-left m-4">Elenco delle risorse utilizzate per la realizzazione del sito web:</p>
                        
                        <ul className="text-left ml-4 list-disc list-inside">
                            <li>Framework-Frontend: <Link target="_blank" href="https://nextjs.org/"  className="text-sky-700 hover:underline">NextJs</Link></li>
                            <li>Framework-Backend: <Link target="_blank" href="https://actix.rs/"  className="text-sky-700 hover:underline">Actix</Link></li>
                            <li>Database usato: <Link target="_blank" href="https://redis.io/"  className="text-sky-700 hover:underline">Redis</Link></li>
                        </ul>

                        <Link href="https://github.com/akiidjk/ProjectIppocrate?tab=readme-ov-file#projectippocrate-%EF%B8%8F">
                            <p className="text-sky-700 hover:underline m-4">Documentazione completa</p>
                        </Link>
                    </div>

                    <div className="shadow"><p className="text-left m-4">Il sito &quot;Salute e Benessere&quot; è nato per promuovere il terzo obiettivo dell&apos;Agenda 2030, concentrato su salute e benessere.Francesco Memoli ha coordinato il progetto, contribuendo sia al design che alla gestione tecnica del sito. Giuseppe Pio Vicedomini ha sviluppato il frontend, creando pagine accessibili e attraenti per gli utenti. Daniele Migliore ha gestito il backend, assicurando l&apos;efficienza del caricamento delle pagine. Rosario Viscardi ed Enrico Cipoletta hanno raccolto fonti e immagini di alta qualità per il sito.Grazie alla collaborazione del team, il sito &quot;Salute e Benessere&quot; è una risorsa preziosa sull&apos;Agenda 2030.</p></div>
                </div>

            </div>
        </>
        
    )
}