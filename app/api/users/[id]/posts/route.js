import { connectToDB } from "@utils/database"
import Prompt from "@models/Prompt"

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const myPrompts = await Prompt.find({creator: params.id}).populate('creator')
    return new Response(JSON.stringify(myPrompts), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", { status: 500 })
  }
}