import { useCallback, useState } from "react";

const useAccount = () => {
  const [isVisibleSetting, setIsVisibleSetting] = useState<boolean>(false);
  const [isVisibleNameSetting, setIsVisibleNameSetting] =
    useState<boolean>(false);
  const [isVisibleEmailSetting, setIsVisibleEmailSetting] =
    useState<boolean>(false);
  const [isVisiblePasswordSetting, setIsVisiblePasswordSetting] =
    useState<boolean>(false);

  const toggleAccountSetting = useCallback(() => {}, []);

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
  };
};

export default useAccount;
