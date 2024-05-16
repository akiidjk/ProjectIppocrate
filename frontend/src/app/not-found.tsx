import Link from "next/link";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <div className="global">
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404 mb-24">
                    <h1 className={montserrat.className}>Oops!</h1>
                </div>
                <h2 className={montserrat.className}>404 - Pagina non trovata.</h2>
                <p className={montserrat.className}>La pagina che state cercando potrebbe essere stata rimossa, aver cambiato nome o essere temporaneamente non disponibile.</p>
                <Link href="/   ">Go To Homepage</Link>
            </div>
        </div>
    </div>
  );
}