import { userSelector } from "./selector";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { loggedUser } = useSelector(userSelector);

  const login = useCallback(async ({username, password}) => {
    // login
  }, []);

  const reAuth = useCallback(() => {
    //call user login
  }, []);

  return {
    loggedUser,
    login,
    reAuth,
  };
};

export default useUser;
