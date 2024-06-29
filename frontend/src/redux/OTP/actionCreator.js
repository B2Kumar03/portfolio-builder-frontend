import { UPDATE_OTP, UTDATE_OTP_AUTH } from "./actionItem"


export const otpAuth=()=>{
    return {type:UTDATE_OTP_AUTH}
}

export const  otpUpdater=(otp)=>{
   return {type:UPDATE_OTP,payload:otp}
}