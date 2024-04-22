import Divider from "@/components/divider";
import Navbar from "../../components/navbar";
import { TracingBeam } from "@/components/AcernityUI/tracing-beam";
import TitlePart from "./components/title_part";
import FirstPart from "./components/first_part";
import SecondPart from "./components/second_part";
import ThirdPart from "./components/third_part";
import CardPart from "./components/card_part";




{/* <div className="flex m-12">
<h1 className={`text-[130px] ${inter.className} font-bold ms-auto me-auto`}>Titolo pagina</h1>
</div> */}


const version:number = 1


export default function SubjectPage(){
    return (
        <div>
            <TracingBeam className="px-6">
            <Navbar/>
            {/* Title part */}
            <TitlePart/>
            {/* First part */}
            <FirstPart/>
            {/* Second part */}
            <SecondPart/>
            {/* Third part */}
            <ThirdPart/>
            {/* Final part */}
            <Divider/>
            <CardPart/>
            </TracingBeam>
        </div>
    )
}