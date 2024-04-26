import Image from "next/image"

interface Props{
    src:string
    title:string
    content:string
    version:number
}

export default function FirstPart(props:Props){
    
    const img_half = (
        <div className="w-[60%] ml-12 mr-4">
            <Image
                width={1070}
                height={570}
                className="rounded-2xl"
                src={props.src}
                alt={"image"}       
                />
        </div>
    )

    
    const content_half = (
        <div className="w-[30%] float-right  mr-12 ml-4">
            <h1 className="lg:text-[54px] sm:text-[32px]  font-bold mb-4">{props.title}</h1>
            <p>
                {props.content}
            </p>
        </div>
    )


    function getHtml(){
        if(props.version == 0){
            return (
                <div className="mt-20 flex">
                    {img_half}
                    {content_half}
                </div>
            )
        } else{
            return (
                <div className="mt-20 flex">
                    {content_half}
                    {img_half}
                </div>
            )
        }
    }

    return getHtml()
}