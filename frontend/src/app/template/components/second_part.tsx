import Image from "next/image"

interface Props{
    src:string
    content:string
    version:number
}

export default function SecondPart(props:Props){

    const img_half = (
        <div className="w-[40%] flex mr-8 ml-8">
            <Image
                className="me-auto ms-auto rounded-full"
                width={420}
                height={420}
                src={props.src}
                alt={"image"}        
            />
        </div>
    )

    const content_half = (
        <div className="w-[70%] float-right  ml-12 mr-4">
            <p className="">
                {props.content}
            </p>
        </div>
    )

    function getHtml(){
        if(props.version == 0){
            return (
                <div className="mt-20 flex">
                    {content_half}
                    {img_half}
                </div>
            )
        }else{
            return (
                <div className="mt-20 flex">
                    {img_half}
                    {content_half}
                </div>
            )
        }
    }

    return getHtml()
}