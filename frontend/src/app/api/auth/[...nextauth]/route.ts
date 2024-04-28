import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcrypt";

const ENDPOINT_AUTH = "http://localhost:8000/admin/auth";

export const authOptions: AuthOptions = {
    session : {
      strategy: "jwt"
    },
    adapter: {

    },
    jwt: {
        maxAge: 60 * 60,
        // async encode(params: { token: JWT,secret: string,maxAge: number }): Promise<string> {
        //     return String(params.token);
        // },
        // async decode(params: {token: string,secret: string}): Promise<JWT | null> {
        //     console.log(params.token)
        //     console.log(params.secret)
        //     console.log(jwt_decode(params.token))
        //     return {}
        // },
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
            name: 'credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            authorize: async function (credentials, req) {

                if(credentials?.username === '' || credentials?.password === '') {
                    return null
                }

                let headers = {
                    'Authorization': `Basic ${btoa(`${credentials?.username}:${credentials?.password}`)}`
                }

                const res = await fetch(ENDPOINT_AUTH, {
                    method: 'GET',
                    headers: headers
                })

                const token = await res.json()

                const user = {
                    token: token,
                }

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