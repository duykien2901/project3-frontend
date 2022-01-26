import { notification } from "antd";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { config } from "src/config";
import { userSelector } from "src/ducks/user/selector";
import { socket } from "src/services/socket";

const useAccount = () => {
  const [isVisibleSetting, setIsVisibleSetting] = useState<boolean>(false);
  const [isVisibleNameSetting, setIsVisibleNameSetting] =
    useState<boolean>(false);
  const [isVisibleEmailSetting, setIsVisibleEmailSetting] =
    useState<boolean>(false);
  const [isVisiblePasswordSetting, setIsVisiblePasswordSetting] =
    useState<boolean>(false);
  const { loggedUser } = useSelector(userSelector);

  const toggleAccountSetting = useCallback(() => {}, []);

  const listenSocket = useCallback(() => {
    loggedUser && socket.emit("auth", loggedUser);

    socket.on("testnoti", (data) => {
      console.log(data);
      notification.info({
        message: "data",
      });
    });
  }, [loggedUser]);

  const removeSocket = useCallback(() => {
    console.log("first");
    socket.removeAllListeners("testnoti");
  }, []);

  return {
    isVisibleSetting,
    setIsVisibleSetting,
    toggleAccountSetting,
    isVisibleNameSetting,
    setIsVisibleNameSetting,
    isVisibleEmailSetting,
    setIsVisibleEmailSetting,
    isVisiblePasswordSetting,
    setIsVisiblePasswordSetting,
    listenSocket,
    removeSocket,
  };
};

export default useAccount;
