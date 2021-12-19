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
import { setUser, signOut } from ".";
import { API_ENDPOINTS } from "src/constants/commom.constant";
import { useHistory } from "react-router-dom";
import axiosInstance from "src/services";

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
    removeToken();
    dispatch(signOut());
    history.push("/login");
  }, [dispatch, history]);

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
  const changePassword = useCallback(async ({ password, userId }) => {
    try {
      await axios.post(API_ENDPOINTS.RESET_PASSWORD, { password, userId });
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
  }, []);

  const changeAccount = useCallback(
    async (value, userId) => {
      const { data }: any = await axiosInstance.patch(
        `${API_ENDPOINTS.USER}/${userId}`,
        value
      );
      data.message &&
        notification.info({
          message: data.message,
          duration: 1,
        });
      data.user && dispatch(setUser({ user: data.user }));
    },
    [dispatch]
  );

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
  };
};

export default useUser;
