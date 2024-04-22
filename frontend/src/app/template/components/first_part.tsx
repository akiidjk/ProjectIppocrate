import Image from "next/image"


export default function FirstPart(){
    return (
        <div className="mt-20 flex">
                <div className="w-[60%] ml-12 mr-4">
                    <Image
                        width={1070}
                        height={570}
                        className="rounded-2xl"
                        // sizes="100vw"
                        src="/img2.jpg"
                        alt={"image"}       
                        // style={{
                        //   width: '100%',
                        //   height: 'auto',
                        // }}
                    />
                </div>
                <div className="w-[30%] float-right  mr-12 ml-4">
                    <h1 className="text-[54px]   font-bold mb-4">Titolo paragrafo 1</h1>
                    <p>
                        Magna ipsum ullamco dolore dolor laboris nulla ut qui ullamco reprehenderit ad non enim ullamco. Et officia pariatur eiusmod amet excepteur fugiat. Officia nisi ea pariatur laboris proident nulla adipisicing consectetur fugiat voluptate dolor sunt incididunt. Voluptate quis dolor irure minim tempor incididunt ex pariatur cupidatat.Aliqua est pariatur aliquip in.Ut aute fugiat culpa qui non voluptate 
                    </p>
                </div>
            </div>
    )
}