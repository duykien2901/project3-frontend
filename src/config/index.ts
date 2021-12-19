const {
  REACT_APP_API_REST_URL,
  REACT_APP_API_SOCKET_URL,
  REACT_APP_CLOUDIARY_FOLDER,
  REACT_APP_CLOUDIARY_NAME,
} = process.env;

export const config = {
  api: {
    restUrl: REACT_APP_API_REST_URL,
    socketUrl: REACT_APP_API_SOCKET_URL,
    folder: REACT_APP_CLOUDIARY_FOLDER,
  },
  cloud: {
    name: REACT_APP_CLOUDIARY_NAME,
    folder: REACT_APP_CLOUDIARY_FOLDER,
  },
};
