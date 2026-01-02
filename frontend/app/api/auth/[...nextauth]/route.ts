import NextAuth from "next-auth"
import type {Account, User} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'Email',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // e.g., validate email and password against a database
            // const user = await authHandler({email: credentials!.email, password: credentials!.password})
            // Return null if user data could not be retrieved
            // if (user)
            //   return user
            return null
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
      const usr = {role: "", firstName: "", lastName: ""}
      token.role = usr.role; // stored in DB
      token.name = usr.firstName + " " + usr.lastName;
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