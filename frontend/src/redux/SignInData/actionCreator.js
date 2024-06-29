import { UPDATE_SIGN_IN_DATA } from "./actionItem";

export const addData=(data)=>{
    return {type:UPDATE_SIGN_IN_DATA,payload:data}
}