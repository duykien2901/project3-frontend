import jwt from "jsonwebtoken";
import { TOKEN } from "src/constants/commom.constant";

export const getToken = () => localStorage.getItem(TOKEN) || "";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const decodeToken = () => {
  if (getToken()) return jwt.decode(getToken());
  else return null;
};
