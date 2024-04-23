

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

    layout: 1
    <Image
        width={1070}
        height={570}
        className="rounded-2xl"
        src={props.src}
        alt={"image"}       
    />

    layout: 2
    <Image
        width={1070}
        height={570}
        className="me-auto ms-auto rounded-full"
        src={props.src}
        alt={"image"}       
    />

    layout: 3

        null
    
* paragraph.title 

layout: 1 e 2

    <h1 className="lg:text-[54px] sm:text-[32px]  font-bold mb-4">{props.title}</h1>

layout: 3

    <h1 className="lg:text-[54px] sm:text-[32px]  font-bold mb-10 text-center">{props.title}</h1>

* paragraph.content 

layout: 1,2 e 3
    <p>
        {props.content}
    </p>


*/


export default function paragraph(props:Props){
    // TODO manage the layout in the FE
    return (
        <div>
            {props.title}
            {props.src}
            {props.content}
        </div>
    )
} 