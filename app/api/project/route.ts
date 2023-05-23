import Projects from "@/models/Projects";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {

  try {
    await connectToDB();
    const projectSchema = await Projects.find({}).populate("_id");
    return new Response(JSON.stringify(projectSchema), { status: 201 });
  } catch (error) {
    new Response("Failed to fech Project", { status: 500 });
  }
};