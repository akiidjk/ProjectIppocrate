import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {getAuth} from "@/app/api/api";
// import bcrypt from "bcrypt";


interface Admin extends User{
    token: string
}

const authOptions: NextAuthOptions = {
    session : {
      strategy: "jwt"
    },
    jwt: {
        maxAge: 60 * 60,
    },
    callbacks: {
        async jwt({ user, token }) {
            const admin = user as Admin
            if (user) {
                token.name = admin.token;
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
              username: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize (credentials) {
                
                if(credentials?.username === '' || credentials?.password === '') {
                    return null
                }

                const res = await getAuth(credentials)

                const user = res.value  as Admin

                if (res.success && user) {
                    return user
                }
                return null
            }
        })
    ],

} 

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}