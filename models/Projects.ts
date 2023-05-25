import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
  author: {
    type: String,
    required: [true, "Author is required."],
  },
  title: {
    type: String,
    required: [true, "title is required."],
  },
  publishDate: {
    type: String,
    required: [true, "publishDate is required."],
  },
  image: {
    type: String,
  },
  paragraph: {
    type: String,
  },
});

const Projects = models.Projects || model("Projects", projectSchema);

export default Projects;
