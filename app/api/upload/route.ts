import multer from "multer";
import { connectToDB } from "@/utils/database";
import mongoose, { ConnectOptions } from "mongoose";
import { ClientSession } from "mongodb";

const upload = multer({ dest: "public/uploads" });

export const POST = async (req, res) => {
  const file = await req.json;
  console.log(file);
  try {
    await connectToDB();

    upload.single("file")(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload file." });
      }
    });
  } catch (error) {
    new Response("Failed to upload", { status: 500 });
  }
};
