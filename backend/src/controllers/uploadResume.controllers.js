import Resume from "../models/uploadResume.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import cloudinaryUpload from "../utils/cloudnaryUpload.js";




const uploadResume = asyncHandler(async (req,res) => {
  console.log('Request Body:', req.body);
  console.log('Request File:', req.file);

  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }

  const localPathFile = req.file?.path;
  
  if (!localPathFile) {
    return res.status(400).json({ success: false, message: "Please upload a file" });
  }

  const cloudinaryUrl = await cloudinaryUpload(localPathFile);
  
  if (!cloudinaryUrl.url) {
    return res.status(500).json({ success: false, message: "Error occurred while uploading file" });
  }

  const storeInDatabase = await Resume.create({
    email,
    url: cloudinaryUrl.url,
  });

  return res.status(200).json({ success: true, message: "Resume uploaded successfully", data: storeInDatabase });
});



export {
  uploadResume,
};
