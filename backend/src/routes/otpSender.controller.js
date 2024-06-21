import { Router  } from "express";
import sentOTP from "../controllers/sentOTP.controller.js";
const otpSneder=Router()


otpSneder.route("/send-otp").post(sentOTP)




export default otpSneder