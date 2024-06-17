import {Router} from "express"
import authMiddleware from "../middlewares/auth.js"
import project from "../controllers/project.controller.js"
import { upload } from "../middlewares/multer.js"


const projectRouter=Router()

projectRouter.route("/project").post(authMiddleware,upload.single("projectImage"),project)

export default projectRouter