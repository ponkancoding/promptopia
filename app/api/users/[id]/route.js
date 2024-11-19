import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  const { id } = await params;
  try {
    await connectToDB();
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}