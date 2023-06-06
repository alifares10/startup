import Projects from "@/models/Projects";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const project = await Projects.findById(params.id).populate("title");
    if (!project) {
      new Response("Project Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    new Response("Failed to fech project", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { author, title, publishDate, paragraph, image } = await req.json();

  try {
    await connectToDB();
    const existingproject = await Projects.findById(params.id);
    if (!title) {
      new Response("Project Not Found", { status: 404 });
    }
    existingproject.author = author;
    existingproject.title = title;
    existingproject.publishDate = publishDate;
    existingproject.paragraph = paragraph;
    existingproject.image = image;
    await existingproject.save();
    return new Response(JSON.stringify(existingproject), { status: 200 });
  } catch (error) {
    new Response("Failed to update Project", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Projects.findByIdAndRemove(params.id);
    return new Response("Project deleted successfully", { status: 200 });
  } catch (error) {
    new Response("Failed to delete Project", { status: 500 });
  }
};
