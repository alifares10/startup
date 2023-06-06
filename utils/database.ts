import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongoDB is Already Connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Startup",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
