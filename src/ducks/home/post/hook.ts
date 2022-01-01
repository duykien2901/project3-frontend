import { notification } from "antd";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { API_ENDPOINTS } from "src/constants/commom.constant";
import { userSelector } from "src/ducks/user/selector";
import { Post } from "src/interfaces";
import uploadFile from "src/libs/helpers/utils/uploadFile";
import isUrl from "src/libs/helpers/utils/url";
import axiosInstance from "src/services";
import { MentionSearch } from "./mentions/hook";

const usePost = () => {
  const [isVisiblePostModal, setIsVisiblePostModal] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();
  const [content, setContent] = useState<string>("");
  const [imagePost, setImagePost] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [linkPreview, setLinkPreview] = useState<string>("");
  const { loggedUser } = useSelector(userSelector);

  const setInitial = () => {
    setContent("");
    setImagePost([]);
    setLinkPreview("");
  };

  const deleteImagePost = useCallback(
    (image: string) => {
      const imagePostResult: string[] = imagePost.filter(
        (item) => item !== image
      );
      setImagePost(imagePostResult);
    },
    [imagePost]
  );

  const beforeUpload = useCallback(
    async (image) => {
      setIsLoading(true);
      try {
        const { url } = await uploadFile(image);
        setImagePost([...imagePost, url]);
        setIsLoading(false);
      } catch (error: any) {
        notification.error({
          message: error.message,
        });
        setIsLoading(false);
      }
    },
    [imagePost]
  );

  const handleChange = useCallback((text: string) => {
    setContent(text);
  }, []);

  const splitUrlContent = useCallback(
    (text) => {
      const splitContent = text
        .split(" ")
        .map((item: any) => {
          if (item.indexOf("\n") > -1) {
            item = item.split("\n").join(" \n ").split(" ");
            return item;
          }
          return item;
        })
        .flat();
      const link = splitContent.find((item: string) => isUrl(item));
      link !== linkPreview && setLinkPreview(link);
    },
    [linkPreview]
  );

  const handelSubmit = useCallback(
    async ({ modeHide, images, content, mentions }) => {
      try {
        const { data } = await axiosInstance.post(API_ENDPOINTS.POST, {
          ownerId: loggedUser?.id,
          modeHide,
          content,
          mentions: mentions.map((item: MentionSearch) => item.userId),
          images,
        });
        console.log(data);
        setInitial();
      } catch (error: any) {
        notification.error({
          message: error.message,
        });
      }
    },
    [loggedUser?.id]
  );

  return {
    isVisiblePostModal,
    setIsVisiblePostModal,
    post,
    setPost,
    content,
    setContent,
    imagePost,
    setImagePost,
    setInitial,
    deleteImagePost,
    beforeUpload,
    isLoading,
    handleChange,
    splitUrlContent,
    linkPreview,
    handelSubmit,
  };
};

export default usePost;
