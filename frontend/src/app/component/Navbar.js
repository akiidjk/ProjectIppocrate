import Image from "next/image"

export default function Navbar(){
    return(
        <>
            <nav className="flex justify-between items-center bg-[#F5F5F5]/[.35] backdrop-blur-sm fixed top-0 w-[100%] h-200"> 
                <div>
                    <Image 
                        className="rounded-full ml-8 py-3"
                        src="/gabibboo_navbar.jpg"
                        width={50}
                        height={50}
                        alt="Picture of gabibbo"
                    />
                </div>
                <div className="mr-8">
                    <ul className="flex gap-8 items-end">
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
        </>
    )
}

