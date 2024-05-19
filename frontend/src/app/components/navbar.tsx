"use client"
import Image from "next/image"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import React from "react"
import { cn } from "@/utils/cn"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          target="_blank"
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const components = [
  <ListItem key={0} href="/pages/italianoestoria" title="Italiano e Storia">
    Cambiamenti moderni nel concetto di salute
  </ListItem>,
  <ListItem key={1} href="/pages/telecomunicazioni" title="Telecomunicazione">
    Ipertermia
  </ListItem>,
  <ListItem key={2} href="/pages/matematica" title="Matematica">
    L&apos;Istat: stile di vita e salute
  </ListItem>,
  <ListItem key={3} href="/pages/tps" title="Tps">
    IoMT
  </ListItem>,
  <ListItem key={4} href="/pages/sistemi" title="Sistemi">
    IOT
  </ListItem>,
  <ListItem key={5} href="/pages/religione" title="Religione">
    Religione e Salute
  </ListItem>,
  <ListItem key={6} href="/pages/educazionefisica" title="Educazione Fisica">
    educazionefisica
  </ListItem>,
  <ListItem key={7} href="/pages/inglese" title="Inglese">
    Comparing countries
  </ListItem>,
  <ListItem key={8} href="/pages/informatica" title="Informatica">
    Sicurezza informatica
  </ListItem>,
]

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 z-10 bg-[#fdfdfd] backdrop-filter backdrop-blur-lg bg-opacity-80">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="">
              <Image
                className="rounded-full ml-9 py-3"
                src="/Logo.svg"
                width={45}
                height={45}
                alt="Picture of gabibbo"
              />
            </span>
            <div className="flex space-x-4 text-gray-900">
              <a className="hover:text-[#4e69c3] text-2xl" href="/">Home</a>
              <a className="hover:text-[#4e69c3] text-2xl" target="_blank" href="https://www.iismargheritahackbaronissi.edu.it/">Scuola</a>
              <a className="hover:text-[#4e69c3] text-2xl" href="/credits">Crediti</a>
              <Link className="hover:text-[#4e69c3] text-2xl" href="/admin/dashboard">Admin</Link>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Lista materie</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {components}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </>
  )
}
