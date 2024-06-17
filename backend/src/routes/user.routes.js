import {Router} from "express"
import { login, registerUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.js"

const userRouter=Router()


userRouter.route("/register").post(upload.single("avtar"),registerUser)
userRouter.route("/login").post(login)

export default userRouter