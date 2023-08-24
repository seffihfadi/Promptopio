import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ], 
  async session({ session }) {

  },
  async signIn({ profile }){
    try {
      await connectToDB()
      // check if user exist ?

      // if not, create new user
      return true
    } catch(err) {
      console.log('SignIn error happend', err)
      return false
    }
  }

})

export {handler as GET, handler as POST}