import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {getAuth} from "@/app/api/api";
// import bcrypt from "bcrypt";


export const authOptions: AuthOptions = {
    session : {
      strategy: "jwt"
    },
    adapter: {

    },
    jwt: {
        maxAge: 60 * 60,
    },
    callbacks: {
        async jwt({ user, token }) {
            //TODO Fix the issue of the parameter (In fact, if you add a parameter to user when trying to retrieve the added value and thus not a default key, it probably disappears due to a TYPE issue )
            if (user) {
                token.name = user.token;
            }
            return token;
        },
    },
    secret: "WMrnFPX8Gafw1BFouLJRRKgCgf/VtKutrgHoScVPobc=",
    debug: true,
    providers : [
        CredentialsProvider({
            id: "",
            type: "credentials",
            name: 'credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            authorize: async function (credentials, req) {

                if(credentials?.username === '' || credentials?.password === '') {
                    return null
                }

                const result = await getAuth(credentials)
                const user = result.value

                if (result.success && user) {
                    return user
                }
                return null
            }
        })
    ],

} 

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}