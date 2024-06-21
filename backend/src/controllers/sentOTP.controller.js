import {asyncHandler} from "../utils/asynchandler.js";
import generateOTP from "../utils/generateOTP.js";
import sendOTP from "../utils/mailer.js";
import User from "../models/user.model.js"
const sentOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  
  try {
    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent successfully",opt:otp });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
  
});


export default sentOTP
