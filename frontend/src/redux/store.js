import { combineReducers, legacy_createStore } from "redux";
import {reducer} from "./OTP/reducer"
import { signInReducer } from "./SignInData/reducer";

const rootReducer=combineReducers({
    // Add your reducers here
    OTP:reducer,
    signIn:signInReducer
})


export const store=legacy_createStore(rootReducer)