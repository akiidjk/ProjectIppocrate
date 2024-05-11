"use client"
import Image from "next/image"
import Link from "next/link";


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
                                width={45}
                                height={45}
                                alt="Picture of gabibbo"
                            />
                        </span>
                            <div className="flex space-x-4 text-gray-900">
                                <a className="hover:text-[#4e69c3]  text-2xl" href="/" >Home</a>
                                <a className="hover:text-[#4e69c3]  text-2xl" target="_blank" href="https://www.iismargheritahackbaronissi.edu.it/">School</a>
                                <a className="hover:text-[#4e69c3]  text-2xl" href="/credits">Credits</a>
                                <Link className="hover:text-[#4e69c3] text-2xl" href="/admin/dashboard">Admin</Link>
                            </div>
                    </div>
                </div>
            </nav>
        </>
    )
}