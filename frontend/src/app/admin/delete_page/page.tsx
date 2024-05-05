"use client"

import { useRouter } from 'next/navigation'
import Loader from "@/app/components/loader"
import Navbar from "@/app/components/navbar"

import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import {Page, usePages} from "@/context/page_provider";
import CardPage from "@/app/admin/delete_page/components/card_page";
import Link from "next/link";



export default function DeletePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { pages, remove_page_by_index, addParagraph,addParagraphs, removeParagraph } = usePages();

    {/*<div dangerouslySetInnerHTML={{ __html: page.page.paragraphs[0].title }} />*/}

    async function getClientSideSession() {
      const session = await getSession()
      return session?.user
    }

  useEffect(() => {
      getClientSideSession().then(session => {
          console.log(session)
          if (!session) {
            router.replace("/admin/login")
            return null
          }else{
              setLoading(false);
          }
        })
    }, []);

    const removePageByIndex = (index: number) => {
        getClientSideSession().then(session => {
                if (session) {
                    console.log(session.name)
                    // @ts-ignore
                    remove_page_by_index(session.name,index)
                }else{
                    setLoading(false);
                }
            }
        )
        console.log(pages)
    };


    if (loading) {
      return <Loader />;
    }

  return (
    <div>
      <Navbar/>
      {/* Render the card base on the list*/}
        <div className="flex">
            <h1 className="me-auto ms-auto text-5xl font-bold m-9">
                Visualizza e elimina qui le pagina che ti interessano
            </h1>
        </div>
        {pages.length == 0 ?
            <div className="flex items-center">
                    <p className="ms-auto me-auto">Oh wow! Sembra che tu non abbia ancora creata una pagina clicca <Link href={"/admin/create_page"} className="items-center hover:underline text-blue-700"> qui per crearne una </Link> </p>
            </div> : <div className="grid grid-cols-4 gap-4">
                {pages.map((page: Page, index) => (
                    <CardPage index={index} key={index} data={page} delete={removePageByIndex}/>
                ))}
            </div>}


    </div>
  )
}