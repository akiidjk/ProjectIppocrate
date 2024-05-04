
import { Montserrat } from "next/font/google";
import Provider from "@/context/Providers";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import { getSession, useSession } from "next-auth/react";

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
    const session = await getSession()
    return session
  }
  
  let session = getClientSideSession()

  return (
    <Provider session={session}>
      <html lang="en">
          <body className={montserrat.className}>
              {children}
              <Toaster />
          </body>
      </html>
    </Provider>
  );
}
  