import { Schema, model, models } from "mongoose";

const fileSchema = new Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
});

const Files = models.Files || model("Files", fileSchema);

export default Files;
