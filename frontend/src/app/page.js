import Image from "next/image";
import Navbar from "./component/Navbar";
import MainTitle from "./component/MainTitle";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main>
        <Navbar/>
        <div className="h-[80px]"></div>
        <MainTitle/>
    </main>
  );
}
