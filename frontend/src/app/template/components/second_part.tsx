import Image from "next/image"

interface Props{
    src:string
    content:string
}

export default function SecondPart(props:Props){
    return (
        <div className="mt-20 flex">
            <div className="w-[70%] float-right  ml-12 mr-4">
                <p className="">
                    {props.content}
                </p>
            </div>
            <div className="w-[40%] flex mr-8 ml-8">
                <Image
                    className="me-auto ms-auto rounded-full"
                    width={420}
                    height={420}
                    src={props.src}
                    alt={"image"}        
                />
            </div>
    </div>
    )
}