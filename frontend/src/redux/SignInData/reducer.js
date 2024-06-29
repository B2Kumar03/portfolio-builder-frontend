import { initalData } from "./intitalState";
import { UPDATE_SIGN_IN_DATA } from "./actionItem";
export const signInReducer = (state = initalData, action) => {
  switch (action.type) {
    case UPDATE_SIGN_IN_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
