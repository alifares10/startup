import AWS from "aws-sdk";

const uploadFileToS3 = (file) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
  });

  console.log(file.name);
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.name,
    Body: file,
  };

  console.log(process.env.S3_BUCKET_REGION);
  console.log(uploadParams);

  // return s3.upload(uploadParams).promise();
};

export default uploadFileToS3;
