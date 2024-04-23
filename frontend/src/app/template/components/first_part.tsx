import Image from "next/image"

interface Props{
    src:string
    title:string
    content:string
}

export default function FirstPart(props:Props){
    return (
        <div className="mt-20 flex">
                <div className="w-[60%] ml-12 mr-4">
                    <Image
                        width={1070}
                        height={570}
                        className="rounded-2xl"
                        // sizes="100vw"
                        src={props.src}
                        alt={"image"}       
                        // style={{
                        //   width: '100%',
                        //   height: 'auto',
                        // }}
                    />
                </div>
                <div className="w-[30%] float-right  mr-12 ml-4">
                    <h1 className="text-[54px]   font-bold mb-4">{props.title}</h1>
                    <p>
                        {props.content}
                    </p>
                </div>
            </div>
    )
}