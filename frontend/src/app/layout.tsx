import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Salute e Benessere",
  description: "Sito descrittivo del obbiettivo salute e benessere del agenda 2030 comprensivo di tutte le materie scolasite",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={montserrat.className}>{children}</body>
    </html>
  );
}
