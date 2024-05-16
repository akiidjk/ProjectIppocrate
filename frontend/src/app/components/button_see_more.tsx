import Link from "next/link";

export default function ButtonSeeMore(){
    return(
    
        <div className="flex m-8 ">
            <Link href="/subject_list" className="ms-auto me-auto">
               <button className="animated-button ">
                    Vedi altro...
                </button>
            </Link>
        </div>
    )
}