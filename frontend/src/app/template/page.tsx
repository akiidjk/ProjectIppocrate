import Divider from "@/components/divider";
import Navbar from "../../components/navbar";
import Image from "next/image"

export default function SubjectPage(){
    return (
        <div>
            <Navbar/>
            {/* Title part */}
            <div className="flex m-12">
                <h1 className="text-6xl font-bold ms-auto me-auto">Titolo pagina</h1>
            </div>
            {/* First part */}
            <div className="mt-20 flex">
                <div className="w-[60%] ml-12 mr-4">
                    <Image
                        className="rounded-2xl"
                        width={1000}
                        height={0}
                        src="/img2.jpg"
                        alt={"image"}        
                    />
                </div>
                <div className="w-[30%] float-right  mr-12 ml-4">
                    <h1 className="text-3xl font-bold mb-4">Titolo paragrafo 1</h1>
                    <p>
                        Magna ipsum ullamco dolore dolor laboris nulla ut qui ullamco reprehenderit ad non enim ullamco. Et officia pariatur eiusmod amet excepteur fugiat. Officia nisi ea pariatur laboris proident nulla adipisicing consectetur fugiat voluptate dolor sunt incididunt. Voluptate quis dolor irure minim tempor incididunt ex pariatur cupidatat.Aliqua est pariatur aliquip in.Ut aute fugiat culpa qui non voluptate 
                    </p>
                </div>
            </div>
            {/* Second part */}
            <div className="mt-20 flex">
                <div className="w-[70%] float-right  ml-12 mr-4">
                    <p>
                        Magna ipsum ullamco dolore dolor laboris nulla ut qui ullamco reprehenderit ad non enim ullamco. Et officia pariatur eiusmod amet excepteur fugiat. Officia nisi ea pariatur laboris proident nulla adipisicing consectetur fugiat voluptate dolor sunt incididunt. Voluptate quis dolor irure minim tempor incididunt ex pariatur cupidatat.Aliqua est pariatur aliquip in.Ut aute fugiat culpa qui non voluptate Magna ipsum ullamco dolore dolor laboris nulla ut qui ullamco reprehenderit ad non enim ullamco. Et officia pariatur eiusmod amet excepteur fugiat. Officia nisi ea pariatur laboris proident nulla adipisicing
                    </p>
                </div>
                <div className="w-[30%] mr-12 ml-4">
                    <Image
                        className="rounded-full"
                        width={200}
                        height={10}
                        src="/gabibboo_navbar.jpg"
                        alt={"image"}        
                    />
                </div>
            </div>
            {/* Third part */}
            <div className="flex m-28">
                <div className="ms-auto me-auto">
                    <h1 className="text-3xl font-bold mb-10 text-center">Titolo paragrafo 2</h1>
                    <p>
                        Magna ipsum ullamco dolore dolor laboris nulla ut qui ullamco reprehenderit ad non enim ullamco. Et officia pariatur eiusmod amet excepteur fugiat. Officia nisi ea pariatur laboris proident nulla adipisicing consectetur fugiat voluptate dolor sunt incididunt. Voluptate quis dolor irure minim tempor incididunt ex pariatur cupidatat.Aliqua est pariatur aliquip in.Ut aute fugiat culpa qui non voluptate
                        Magna ipsum ullamco dolore dolor laboris nulla ut qui ullamco reprehenderit ad non enim ullamco. Et officia pariatur eiusmod amet excepteur fugiat. Officia nisi ea pariatur laboris proident nulla adipisicing consectetur fugiat voluptate dolor sunt incididunt. Voluptate quis dolor irure minim tempor incididunt ex pariatur cupidatat.Aliqua est pariatur aliquip in.Ut aute fugiat culpa qui non voluptate 
                        Magna ipsum ullamco dolore dolor laboris nulla ut qui ullamco reprehenderit ad non enim ullamco. Et officia pariatur eiusmod amet excepteur fugiat. Officia nisi ea pariatur laboris proident nulla adipisicing consectetur fugiat voluptate dolor sunt incididunt. Voluptate quis dolor irure minim tempor incididunt ex pariatur cupidatat.Aliqua est pariatur aliquip in.Ut aute fugiat culpa qui non voluptate 
                    </p>
                </div>
            </div>
            {/* Final part */}
            <Divider/>
            <div>
                <div className ="parent">
                    <div className="div1 h-[400px] bg-gray-500 w-[200px] rounded-3xl"></div>
                    <div className="div2 h-[400px] bg-gray-500 w-[200px] rounded-3xl"></div>
                    <div className="div3 h-[400px] bg-gray-500 w-[200px] rounded-3xl"></div>
                </div>
            </div>

        </div>
    )
}