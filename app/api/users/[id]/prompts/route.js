import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, { params }) => {
  const {id} = await params;
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: id
    }).populate('creator');
    return new Response(JSON.stringify(prompts), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 })
  }
}