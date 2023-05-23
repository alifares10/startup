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
    paragraph: {
        type: String,
        required: [true, "paragraph is required."],
    },
});

const Projects = models.Projects || model("Projects", projectSchema);

export default Projects;

