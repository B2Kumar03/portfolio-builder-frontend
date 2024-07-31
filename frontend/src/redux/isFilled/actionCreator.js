import {
  UPDATE_DETAILS,
  UPDATE_PROJECT,
  UPDATE_RESUME,
  UPDATE_SKILLS,
} from "./actionItem";

export const update_resume = () => {
  return {
    type: UPDATE_RESUME,
  };
};

export const update_project = () => {
  return {
    type: UPDATE_PROJECT,
  };
};

export const update_details = () => {
  return {
    type: UPDATE_DETAILS,
  };
};

export const update_skill = () => {
  return {
    type: UPDATE_SKILLS,
  };
};
