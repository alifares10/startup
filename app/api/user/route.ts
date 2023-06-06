import User from "@/models/User";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const userSchema = await User.find({}).populate("_id");
    return new Response(JSON.stringify(userSchema), { status: 201 });
  } catch (error) {
    new Response("Failed to fech Users", { status: 500 });
  }
};
