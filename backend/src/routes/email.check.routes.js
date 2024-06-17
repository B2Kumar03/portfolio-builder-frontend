import {Router} from "express"
import emailCheck from "../controllers/email-check.controllers.js"


const emailCheckRouter=Router()


emailCheckRouter.route("/email-check").post(emailCheck)


export default emailCheckRouter