import { combineReducers, legacy_createStore } from "redux";
import { reducer } from "./OTP/reducer";
import { signInReducer } from "./SignInData/reducer";
import { authReducer } from "./auth/reducer";
import { loadingReducer } from "./Loading/reducer";
import { isFilled } from "./isFilled/reducer";

const rootReducer = combineReducers({
  // Add your reducers here
  OTP: reducer,
  signIn: signInReducer,
  auth: authReducer,
  loading: loadingReducer,
  isFilled: isFilled,
});

export const store = legacy_createStore(rootReducer);
