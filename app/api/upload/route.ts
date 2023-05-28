import { connectToDB } from "@/utils/database";
import Files from "@/models/Files";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import uploadFileToS3 from "@/components/Project/UploadToS3";
import Projects from "@/models/Projects";
import Busboy from "busboy";

export const POST = async (req, res) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION,
  });

  const busboy = Busboy({ headers: req.headers });
  busboy.on("file", async (fieldName, file, filename, encoding, mimtype) => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: filename,
      Body: file,
    };

    const uplaod = s3.upload(params).promise();
    console.log("upload:", uplaod);
    res.json({ message: "File uploaded successfully" });
  });
  return req.pipe(busboy);
};
