import mongoose from "mongoose";
import { asyncHandler } from "../utils/asynchandler.js";
import { DB_NAME } from "../constant.js";

const mongodbConnection = async () => {
    
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGOOSE_URI}/${DB_NAME}`
    );
    console.log(
      `Database connected successfully ✅|| DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Database connection failed 🔴 ${error}`);
    process.exit(1);
  }
};

export default mongodbConnection
