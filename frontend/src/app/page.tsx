import Navbar from "./components/navbar";
import MainTitle from "./components/main_title";
import MainBody from "./components/main_body";
import BodyCard from "./components/card_body";

export default function Home() {
  return (
      <main>
          <Navbar/>
          <MainTitle/>
          <MainBody/>
          <BodyCard/>
      </main>
  );
}