import Users from '@models/Users'
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
  callbacks: {

    async session({ session }) {
      
      const sessionUser = await Users.findOne({email: session.user.email})
      session.user.id = sessionUser._id.toString()
      return session
    },
    
    async signIn({ profile }){
      try {
        await connectToDB()
        // check if user exist 
        const user = await Users.findOne({email: profile.email})
        // if not, create new user
        if (!user) {
          await Users.create({
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