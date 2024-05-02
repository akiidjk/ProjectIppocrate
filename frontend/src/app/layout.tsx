import { Montserrat } from "next/font/google";
import Provider from "@/context/Providers";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

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
  return (
    <Provider>
      <html lang="en">
          <body className={montserrat.className}>
              {children}
              <Toaster />
          </body>
      </html>
    </Provider>
  );
}
  