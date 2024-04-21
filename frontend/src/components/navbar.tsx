import Image from "next/image"

export default function Navbar(){
    return(
        <>
           <nav className="sticky top-0 z-10 bg-[#fdfdfd] backdrop-filter backdrop-blur-lg bg-opacity-80">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <span className="">
                                <Image 
                                className="rounded-full ml-9 py-3"
                                src="/gabibboo_navbar.jpg"
                                width={50}
                                height={50}
                                alt="Picture of gabibbo"
                            />
                        </span>
                            <div className="flex space-x-4 text-gray-900">
                                <a className="hover:text-[#4e69c3]  text-2xl" href="#" >Home</a>
                                <a className="hover:text-[#4e69c3]  text-2xl" href="#">School</a>
                                <a className="hover:text-[#4e69c3]  text-2xl" href="#">Credits</a> 
                            </div>
                    </div>
                </div>
            </nav>
        </>
    )
}



/*
<nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">

 <nav className="z-auto flex justify-between items-center bg-[#F5F5F5]/[.55] backdrop-blur-lg fixed top-0 w-[100%] h-200"> 
                <div>
                    <Image 
                        className="rounded-full ml-9 py-3"
                        src="/gabibboo_navbar.jpg"
                        width={50}
                        height={50}
                        alt="Picture of gabibbo"
                    />
                </div>
                <div className="mr-8">
                    <ul className="flex gap-8 items-end mr-10">
                        <li>
                            <a className="hover:text-gray-500 text-2xl" href="#" >Home</a>
                        </li>
                        <li>
                            <a className="hover:text-gray-500 text-2xl" href="#">School</a>
                        </li>
                        <li>
                            <a className="hover:text-gray-500 text-2xl" href="#">Credits</a> 
                        </li>
                    </ul>
                </div>
            </nav>


*/