import { UPDATE_AUTH } from "./actionItm";

export const updataAuth = (token) => {
  return { type: UPDATE_AUTH, payload: token };
};
