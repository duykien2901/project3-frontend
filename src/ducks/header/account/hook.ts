import { useCallback, useState } from "react";

const useAccount = () => {
  const [isVisibleSetting, setIsVisibleSetting] = useState<boolean>(false);
  const toggleAccountSetting = useCallback(() => {}, []);
  return {
    isVisibleSetting,
    setIsVisibleSetting,
    toggleAccountSetting,
  };
};

export default useAccount;
