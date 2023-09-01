'use client'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const ProfileLayout = ({children}) => {
  const { data: session } = useSession()
  const router = useRouter()
  if (!!!session) return router.push('/')
  return (
    <>
      {children}
    </>
  )
}

export default ProfileLayout