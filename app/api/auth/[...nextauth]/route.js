import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from "@models/User"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ], 
  callbacks: {

    async session({ session }) {
      const sessionUser = await User.findOne({email: session.user.email})
      session.user.id = sessionUser._id.toString()
      return session
    },
    
    async signIn({ profile }){
      try {
        await connectToDB()
        // check if user exist 
        const user = await User.findOne({email: profile.email})
        // if not, create new user
        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture
          })
        }
        return true
      } catch(err) {
        console.log('SignIn error happend', err)
        return false
      }
    }
  }

})

export {handler as GET, handler as POST}