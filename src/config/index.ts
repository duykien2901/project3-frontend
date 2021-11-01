const { REACT_APP_API_REST_URL, REACT_APP_API_SOCKET_URL } = process.env;

export const config = {
  api: {
    restUrl: REACT_APP_API_REST_URL,
    socketUrl: REACT_APP_API_SOCKET_URL,
  },
};
