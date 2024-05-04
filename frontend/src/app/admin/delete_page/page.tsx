"use client"

import { useRouter } from 'next/navigation'
import Loader from "@/app/components/loader"
import Navbar from "@/app/components/navbar"

import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'



export default function DeletePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
  
    if (loading) {
      return <Loader />;
    }


  

  // console.log("Token Bearear:", session?.user?.name)

  return (
    <div>
      <Navbar/>
      {/* Render the card base on the list*/}
    </div>
  )
}