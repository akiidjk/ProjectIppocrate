import Navbar from "./components/navbar";
import MainTitle from "./components/main_title";
import MainBody from "./components/main_body";
import BodyCard from "./components/card_body";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
        <Navbar/>
        <MainTitle/>
        <Link href="/admin/login">Login</Link>
        <MainBody/>
        <BodyCard/>
    </main>
  );
}
//nwJhAvQjQE7ePLV+a6F+GkIvMexw5XDeJHB+EQCF8Pk=