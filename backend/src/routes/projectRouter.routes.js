import {Router} from "express"
import authMiddleware from "../middlewares/auth.js"
import {getProject,project} from "../controllers/project.controller.js"
import { upload } from "../middlewares/multer.js"
import accessAuthMiddleware from "../middlewares/accessAuth.middleware.js"

const projectRouter=Router()

projectRouter.route("/project").post(upload.single("projectImage"),project)
projectRouter.route("/get-project").get(accessAuthMiddleware,getProject)

export default projectRouter