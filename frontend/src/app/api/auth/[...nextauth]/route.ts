import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    session : {
      strategy: "jwt"
    },
    secret: "WMrnFPX8Gafw1BFouLJRRKgCgf/VtKutrgHoScVPobc=",
    debug: true, //production
    providers : [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
            
                if (res.ok && user) {
                    return user
                }
                return null
            }
          })
    ],

} 

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}