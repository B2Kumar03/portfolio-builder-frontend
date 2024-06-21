// utils/otpGenerator.js
import crypto from "crypto"

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export default generateOTP;
