import { userSelector } from "./selector";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "src/services";
import { Modal, notification } from "antd";
import {
  decodeToken,
  getToken,
  removeToken,
  setToken,
} from "src/libs/helpers/token";
import { setUser, setUserProfile, signOut } from ".";
import { API_ENDPOINTS } from "src/constants/commom.constant";
import { useHistory } from "react-router-dom";
import axiosInstance from "src/services";
import { socket } from "src/services/socket";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [signupSuceed, setSignupSuceed] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState<string>("");

  const { loggedUser } = useSelector(userSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const resendMail = useCallback(async (email, forgot = false) => {
    try {
      await axios.post(API_ENDPOINTS.RESENT, { email, forgot });
      Modal.success({
        content: "you check your mail to active account",
        centered: true,
      });
    } catch (err: any) {}
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      // login
      setLoading(true);
      try {
        const { data } = await axios.post(API_ENDPOINTS.LOGIN, {
          email,
          password,
        });
        setToken(data.access_token);
        dispatch(setUser({ user: data.user }));
        setLoading(false);
        setTimeout(() => {
          history.push("/");
          notification.success({
            message: `Xin chào ${data.user.name}`,
            duration: 1,
          });
        }, 200);
      } catch (err: any) {
        const { message, acceptMail } = err.response.data;
        acceptMail
          ? resendMail(email)
          : notification.error({
              message,
              duration: 2,
            });
        setLoading(false);
      }
    },
    [dispatch, history, resendMail]
  );

  const logout = useCallback(() => {
    socket.emit("logout", loggedUser?.userId);
    removeToken();
    dispatch(signOut());
    history.push("/login");
  }, [dispatch, history, loggedUser?.userId]);

  const signup = useCallback(async ({ name, password, email }) => {
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.SIGNUP, { name, password, email });
      setEmail(email);
      setSignupSuceed(true);
      setLoading(false);
    } catch (error: any) {
      notification.error({
        message: error.response.data.message,
      });
      setLoading(false);
    }
  }, []);

  const reAuth = useCallback(async () => {
    //call user login
    if (!getToken()) {
      setLoading(false);
    } else {
      try {
        const decode: any = decodeToken();
        if (decode) {
          const { data } = await axios.get(
            API_ENDPOINTS.USER + `/${decode?.id}`
          );
          dispatch(setUser({ user: data.user }));
        } else {
          removeToken();
          history.push("/login");
        }
        setLoading(false);
      } catch (err: any) {
        notification.error({
          message: err.response?.data.message,
          duration: 1,
        });
        removeToken();
        history.push("/login");
        setLoading(false);
      }
    }
  }, [dispatch, history]);

  const verifyAccount = useCallback(async ({ userId }) => {
    setLoading(true);
    try {
      await axios.post(API_ENDPOINTS.ACCEPT, { userId });
      setLoading(false);
    } catch (error: any) {
      notification.error({
        message: error.response.data.message,
      });
      setLoading(false);
      setError(true);
    }
  }, []);

  const verifyChangeMail = useCallback(async ({ userId, email }) => {
    setLoading(true);
    try {
      await axios.put(API_ENDPOINTS.USER_ACCEPT_MAIL, { userId, email });
      setLoading(false);
    } catch (error) {}
  }, []);

  const forgot = useCallback(
    ({ email }) => {
      try {
        resendMail(email, true);
      } catch (err) {
        console.log(err);
      }
    },
    [resendMail]
  );

  const changePassword = useCallback(
    async ({ password, userId, currentPassword }) => {
      try {
        await axios.post(API_ENDPOINTS.RESET_PASSWORD, {
          password,
          userId,
          currentPassword,
        });
        Modal.success({
          content: "Successfully",
          centered: true,
        });
      } catch (err: any) {
        notification.error({
          message: err.response.data.message || err.message,
          duration: 2,
        });
      }
    },
    []
  );

  const changeAccount = useCallback(
    async (value) => {
      try {
        const { data }: any = await axiosInstance.patch(
          `${API_ENDPOINTS.USER}/${loggedUser?.id}`,
          value
        );
        data.message &&
          notification.info({
            message: data.message,
            duration: 1,
          });
        data.user && dispatch(setUser({ user: data.user }));
      } catch (error: any) {
        notification.error({
          message: error.response.data.message || error.message,
        });
      }
    },
    [dispatch, loggedUser?.id]
  );

  const getProfileUser = useCallback(
    async (userId) => {
      try {
        const {
          data: { user },
        } = await axiosInstance.get(`${API_ENDPOINTS.USER}/${userId}`);
        console.log(user);
        dispatch(setUserProfile({ user }));
      } catch (err: any) {
        notification.error({ message: err.message });
      }
    },
    [dispatch]
  );

  const handleCreateFollow = useCallback(async ({ userId, followId }) => {
    try {
      const { data } = await axiosInstance.post(
        `${API_ENDPOINTS.USER}/${userId}/follows`,
        { followId }
      );
      console.log(data);
    } catch (err) {}
  }, []);

  return {
    loggedUser,
    login,
    reAuth,
    signup,
    signupSuceed,
    resendMail,
    email,
    loading,
    setLoading,
    verifyAccount,
    error,
    forgot,
    changePassword,
    changeAccount,
    logout,
    verifyChangeMail,
    getProfileUser,
    handleCreateFollow,
  };
};

export default useUser;
