import {
  UPDATE_DETAILS,
  UPDATE_PROJECT,
  UPDATE_RESUME,
  UPDATE_SKILLS,
} from "./actionItem";
import { intitalState } from "./intialState";

export const isFilled = (state = intitalState, action) => {
  switch (action.type) {
    case UPDATE_DETAILS: {
      return { ...state, details: true };
    }
    case UPDATE_PROJECT: {
      return { ...state, projects: true };
    }
    case UPDATE_RESUME: {
      return { ...state, resume: true };
    }
    case UPDATE_SKILLS: {
      return { ...state, skills: true };
    }
    default: {
      return state;
    }
  }
};
