import { useState } from "react";

const usePost = () => {
  const [isVisiblePostModal, setIsVisiblePostModal] = useState<boolean>(false);

  return { isVisiblePostModal, setIsVisiblePostModal };
};

export default usePost;
