import { Router } from "express";
import { uploadResume } from "../controllers/uploadResume.controllers.js";
import { upload } from "../middlewares/multer.js"

const resumeRoute = Router();
resumeRoute.route("/upload-resume").post(upload.single("url"),uploadResume);


export default resumeRoute