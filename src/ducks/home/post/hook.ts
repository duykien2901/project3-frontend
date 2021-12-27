import { useState } from "react";
import { Post } from "src/interfaces";

const usePost = () => {
  const [isVisiblePostModal, setIsVisiblePostModal] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();

  return {
    isVisiblePostModal,
    setIsVisiblePostModal,
    post,
    setPost,
  };
};

export default usePost;
