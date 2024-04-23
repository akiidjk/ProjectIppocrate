import Divider from "../components/divider";
import Navbar from "../components/navbar";
import { TracingBeam } from "../components/AcernityUI/tracing-beam";
import TitlePart from "./components/title_part";
import FirstPart from "./components/first_part";
import SecondPart from "./components/second_part";
import ThirdPart from "./components/third_part";
import CardPart from "./components/card_part";




const version:number = 1

const content1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function SubjectPage(){
    return (
        <div>
            <Navbar/>
            <TracingBeam className="px-6">
            <TitlePart title="Titolo 1" subtitle="Sottotitolo"/>
            <FirstPart src={"/img2.jpg"} title={"Titolo 2"} content={content1} version={0}/>
<SecondPart src={"/gabibboo_navbar.jpg"} content={content1} version={0}/>

<ThirdPart title={"Titolo 3"} content={content1}/>
            <Divider/>
            <CardPart/>
            </TracingBeam>
        </div>
    )
}

// TODO GENERALIZE
/*
 <FirstPart src={"/img2.jpg"} title={"Titolo 2"} content={content1} version={0}/>
<SecondPart src={"/gabibboo_navbar.jpg"} content={content1} version={0}/>

<ThirdPart title={"Titolo 3"} content={content1}/>
Final part */