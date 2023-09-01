import { connectToDB } from "@utils/database"
import Prompt from "@models/Prompt"
import { NextResponse } from "next/server"
import { getErr } from "@utils/handleDBErrors"

export const POST = async (req, res) => {
  const { userID, prompt, tag } = await req.json()
  //console.log('req.body', prompt)

  try {
    await connectToDB()
    const newPrompt = await Prompt.create({creator: userID, prompt, tag})
    if (!!newPrompt) {
      return NextResponse.json({msg: 'prompt created'}, { status: 201 })
    }else{
      throw new Error('failed to create the prompt, try later')
    }
  } catch (err) {
    return NextResponse.json({msg: getErr(err.message)}, { status: 400 })
  }
  
}