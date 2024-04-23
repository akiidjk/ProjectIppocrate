import Link from "next/link";

export default function ButtonSeeMore(){
    return(
    
        <div className="flex m-8">
           <button className="animated-button ms-auto me-auto">
                <Link href="/subject_list">More</Link>
            </button>
        </div>
    )
}