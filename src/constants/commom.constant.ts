export const TOKEN = "auth";
export const API_ENDPOINTS = {
  USER: "/api/v1/user",
  LOGIN: "/api/v1/login",
  SIGNUP: "/api/v1/signup",
  RESENT: "/api/v1/resend-mail",
  ACCEPT: "/api/v1/signup/accept",
  RESET_PASSWORD: "/api/v1/reset-password",
  USER_ACCEPT_MAIL: "/api/v1/user/accept-mail",
  POST: "/api/v1/posts",
  GROUP: "/api/v1/group",
  COMMENT: "/api/v1/comments",
  REPLY: "/api/v1/replies",
};

export const MODE_HIDE: Record<string, any> = {
  PUBLIC: {
    text: "Công khai",
    value: 0,
  },
  FRIEND: {
    text: "Bạn bè",
    value: 1,
  },
  PRIVATE: {
    text: "Chỉ mình tôi",
    value: 2,
  },
};

export enum SCROLL_PATH {
  HOME = "/",
  USER = "/user",
}
