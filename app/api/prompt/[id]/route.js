import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req, { params }) => {
  const {id} = await params;
  try {
    await connectToDB();
    const prompt = await Prompt.findById(id).populate('creator');

    if (!prompt) {
      return new Response(JSON.stringify({ message: 'Prompt not found' }), { status: 404 })
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 })
  }
}

// PATH - update
export const PATCH = async (req, { params }) => {
  const {id} = await params;
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ message: 'Prompt not found' }), { status: 404 })
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 })
  }
}

// DELETE - delete
export const DELETE = async (req, { params }) => {
  const {id} = await params;

  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: 'Prompt deleted' }), {
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 })
  }
}