import Image from "next/image"

interface Props{
    src:string
    title:string
    content:string
    layout:number
}

/*


  GET BE -> FE
  
  {
    src: "<Image
        width={1070}
        height={570}
        className="me-auto ms-auto rounded-full"
        src={props.src}
        alt={"image"}       
    />"
    title: "<h1 className="lg:text-[54px] sm:text-[32px]  font-bold mb-4">{props.title}</h1>"
    content: "    <p>
        {props.content}
    </p>"
  }

* paragraph.src 

    layout: 1 e 4
    <Image
        width={1070}
        height={570}
        className="rounded-2xl"
        src={props.src}
        alt={"image"}       
    />

    layout: 2 e 5
    <Image
        width={1070}
        height={570}
        className="me-auto ms-auto rounded-full"
        src={props.src}
        alt={"image"}       
    />

    layout: 3 e 6

        null
    
* paragraph.title 

layout: 1,2,4 e 5

    <h1 className="lg:text-[54px] sm:text-[32px]  font-bold mb-4">{props.title}</h1>

layout: 3

    <h1 className="lg:text-[54px] sm:text-[32px]  font-bold mb-10 text-center">{props.title}</h1>

* paragraph.content 

layout: 1,2,3,4,5
    <p>
        {props.content}
    </p>


*/


export default function Paragraph(props:Props){
    // TODO manage the layout in the FE

    const img_half_l1 = (
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

    const img_half_l2 = (
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

    const content_half_l2 = (
        <div className="w-[70%] float-right  ml-12 mr-4">
            <p className="">
                {props.content}
            </p>
        </div>
    )

    const content_half_l1 = (
        <div className="w-[30%] float-right  mr-12 ml-4">
            <h1 className="lg:text-[54px] sm:text-[32px]  font-bold mb-4">{props.title}</h1>
            <p>
                {props.content}
            </p>
        </div>
    )

    function getHTML(){
        switch(props.layout){
            case 1:
            case 4:
                if(props.layout == 1){
                    return (
                        <>
                            <div className="mt-20 flex">
                                {img_half_l1}
                                {content_half_l1}
                            </div>
                        </>
                    )
                }else{
                    return (
                        <>
                            <div className="mt-20 flex">
                                {content_half_l1}
                                {img_half_l1}
                            </div>
                        </>
                    )
                }
                
            case 2:
            case 5:
                if(props.layout == 2){
                    return (
                        <>
                            <div className="mt-20 flex">
                                {content_half_l2}
                                {img_half_l2} 
                            </div>
                        </>  
                    )
                } else {
                    return (
                        <>
                            <div className="mt-20 flex">
                                {img_half_l2} 
                                {content_half_l2}
                            </div>
                        </>  
                    )
                }
            case 3:
                return (
                    <div className="flex m-28">
                        <div className="ms-auto me-auto">
                            <h1 className="lg:text-[54px] sm:text-[32px]  font-bold mb-10 text-center">{props.title}</h1>
                            <p>
                                {props.content}
                            </p>
                        </div>
                    </div>
                )
            default:
                return (
                    <div></div>
                )
        }
    }

    return getHTML()
        
} 