import Projects from "@/models/Projects";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { author, title, publishDate ,image , paragraph } = await req.json();

  try {
    await connectToDB();
    const newProject = new Projects({ author, title, image, publishDate, paragraph });
    await newProject.save();
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (error) {
    new Response("Failed to create new project", { status: 500 });
  }
};
