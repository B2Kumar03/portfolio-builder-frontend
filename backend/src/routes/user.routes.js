import {Router} from "express"
import { getUser, login, registerUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.js"
import accessAuthMiddleware from "../middlewares/accessAuth.middleware.js"

const userRouter=Router()


userRouter.route("/register").post(upload.single("avtar"),registerUser)
userRouter.route("/login").post(login)
userRouter.route("/getuser").get(accessAuthMiddleware,getUser)

export default userRouter