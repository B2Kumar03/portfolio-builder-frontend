import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv"
import { format } from "path";
dotenv.config()

// Configuration

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});


const cloudinaryUpload = async (localFilePath) => {
 
  try {
    if (!localFilePath) {
      return null;
    }
    //upload the file on cloudinary
    
    const response = await cloudinary.uploader.upload(localFilePath, {
     resource_type: "auto",
    })
    fs.unlinkSync(localFilePath);
    return response;
    //file has been uploaded successfully
    console.log("File is uploaded on cloudinary");
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove locally save temprorly file got failed
    console.log("Error occurs while uploading file on cluodniry",error);
    return null;
  }
};

export default cloudinaryUpload;
