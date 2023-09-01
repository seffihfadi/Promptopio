'use client'
import { SessionProvider } from "next-auth/react"

const Provider = ({ children, session }) => {
 // if(!session) redirect('/')
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider