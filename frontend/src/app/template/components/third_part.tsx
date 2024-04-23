
interface Props{
    title:string
    content:string
}

export default function ThirdPart(props:Props){
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
}