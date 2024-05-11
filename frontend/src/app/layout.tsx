import {Montserrat} from "next/font/google";
import ProviderSession from "@/context/session_provider";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import {getSession} from "next-auth/react";
import {PagesProvider} from "@/context/page_provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Salute e Benessere",
  description: "Sito descrittivo del obbiettivo salute e benessere del agenda 2030 comprensivo di tutte le materie scolasite",
};

//* https://www.youtube.com/watch?v=b3pbgBmEGcU RESOURCE

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  async function getClientSideSession() {
      return await getSession()
  }
  
  let session = getClientSideSession()

  return (
    <ProviderSession session={session}>
        <PagesProvider>
          <html lang="en">
              <body className={montserrat.className}>
                  {children}
                  <Toaster />
              </body>
          </html>
        </PagesProvider>
    </ProviderSession>
  );
}
  