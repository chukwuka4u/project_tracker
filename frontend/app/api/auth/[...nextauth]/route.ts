import NextAuth from "next-auth"
import type {Account, User} from "next-auth"
import { TrackerAPI } from '@/lib/requests'
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'Email',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
            password: { label: "Password", type: "password" },
            name: {label: "Name", type: "text"}
          },
          async authorize(credentials, req) {
            const user = credentials!.name ? await TrackerAPI.createUser({email: credentials?.email, name: credentials?.name, password: credentials?.password, role: "user"}) : await TrackerAPI.authUser(credentials)

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null
          }
          }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
      async signIn({ user, account } : {user: User, account: Account | null}) {
        return true
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async jwt({ token, user } : {token : any, user : User}) {
    if (user) {
     token.id = user.id
     token.role = user.role
    }
    return token;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async session({ session, token } : { session : any , token : any}) {
    if (session.user) {
      session.user.role = token.role; // expose to client
      if (!session.user.name)
        session.user.name = token.name
    }
    return session;
  },
}
}

const handler =  NextAuth(authOptions)
export {handler as GET, handler as POST}