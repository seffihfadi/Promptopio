'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatePrompt = () => {
  const router = useRouter()
  const {data: session} = useSession()
  const [submiting, setSubmiting] = useState(false)
  const [postForm, setPostForm] = useState({
    prompt: '',
    tag: '',
  })
  const createPrompt = async (e) => {
    e.preventDefault()
    setSubmiting(true)
    //console.log('postForm', postForm)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: session?.user.id,
          prompt: postForm.prompt,
          tag: postForm.tag
        })
      })
      console.log('response', response)
      if (response.status === 201) {
        router.push('/')
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setSubmiting(false)
    }

  }


  return (
    <Form 
      type='Create'
      form={postForm}
      setForm={setPostForm}
      handleSubmit={createPrompt}
      submiting={submiting}
    />
  )
}

export default CreatePrompt