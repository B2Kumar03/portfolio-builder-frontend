import { LOADING } from "./actionItem";
import { intialState } from "./intitalState";

export const loadingReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};
