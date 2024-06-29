import { UPDATE_OTP, UTDATE_OTP_AUTH } from "./actionItem";
import { intialState } from "./intitalState";

export const reducer = (state = intialState, action) => {
  switch (action.type) {
    case UTDATE_OTP_AUTH:
      return { ...state, isOtpMatched: !state.isOtpMatched };
    
      case UPDATE_OTP:
        return { ...state, otp: action.payload };

    default:
      return state;
  }
};
