import { ERROR } from "./actionItem";
import { intialState } from "./intitalState";



export const  errorReducer=(state=intialState,action)=>{

    switch(action.type){
        case ERROR:return {...state,error:!state.error}
    default:
        return state
    }

}