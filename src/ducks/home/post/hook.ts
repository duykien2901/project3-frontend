import { notification } from "antd";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS, SCROLL_PATH } from "src/constants/commom.constant";
import { PAGINATION } from "src/constants/post.constant";
import { userSelector } from "src/ducks/user/selector";
import uploadFile from "src/libs/helpers/utils/uploadFile";
import isUrl from "src/libs/helpers/utils/url";
import axiosInstance from "src/services";
import {
  addPostScroll,
  changeReactionComment,
  changeReactionPost,
  changeReactionReply,
  Comment,
  createComment,
  createPost,
  createReply,
  deleteComment,
  deletePost,
  deleteReply,
  getCommentPost,
  getRepliesComment,
  Post,
  Reply,
  setAllPost,
  setPostDetail,
  updateCommentById,
  updatePostById,
  updateReplyById,
} from ".";
import { MentionSearch } from "./mentions/hook";
import { postSelector } from "./selector";

const usePost = () => {
  const [isVisiblePostModal, setIsVisiblePostModal] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();
  const [content, setContent] = useState<string>("");
  const [imagePost, setImagePost] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [linkPreview, setLinkPreview] = useState<string>("");
  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [commentUpdated, setCommentUpdated] = useState<Comment | null>(null);
  const [visibleComment, setVisibleComment] = useState(false);
  const { loggedUser } = useSelector(userSelector);
  const { comments: commentStore, repliesComment: repliesStore } =
    useSelector(postSelector);

  const dispatch = useDispatch();

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
    async ({ id, modeHide, images, content, mentions, isUpdate }) => {
      const dataBody = {
        ownerId: loggedUser?.id,
        modeHide,
        content,
        mentions: mentions.map((item: MentionSearch) => item.userId),
        images,
      };
      try {
        if (isUpdate) {
          const {
            data: { post },
          } = await axiosInstance.put(`${API_ENDPOINTS.POST}/${id}`, dataBody);
          dispatch(updatePostById({ post }));
        } else {
          const {
            data: { post },
          } = await axiosInstance.post(API_ENDPOINTS.POST, dataBody);
          dispatch(createPost({ post }));
        }
        setInitial();
      } catch (error: any) {
        notification.error({
          message: error.message,
        });
      }
    },
    [dispatch, loggedUser?.id]
  );

  const handleCommentSubmit = useCallback(
    async ({ id, images, content, mentions, isUpdate, postId }) => {
      const dataBody = {
        ownerId: loggedUser?.id,
        content,
        mentions: mentions.map((item: MentionSearch) => item.userId),
        images,
        postId,
      };
      try {
        if (isUpdate) {
          const {
            data: { comment },
          } = await axiosInstance.put(
            `${API_ENDPOINTS.COMMENT}/${id}`,
            dataBody
          );
          dispatch(updateCommentById({ comment, postId }));
        } else {
          const {
            data: { comment },
          } = await axiosInstance.post(API_ENDPOINTS.COMMENT, dataBody);
          dispatch(createComment({ comment, postId }));
        }
        setInitial();
      } catch (error) {}
    },
    [dispatch, loggedUser?.id]
  );

  const getPost = useCallback(async () => {
    setIsLoadingPost(true);
    try {
      const { data } = await axiosInstance.get(
        `${API_ENDPOINTS.POST}?limit=${PAGINATION.LIMIT * page}&offset=${
          PAGINATION.OFFSET * (page - 1)
        }`
      );
      dispatch(setAllPost({ posts: data.posts, total: data.total }));
      setIsLoadingPost(false);
    } catch (error: any) {
      notification.error({
        message: error.message,
      });
      setIsLoadingPost(false);
    }
  }, [dispatch, page]);

  const deletePostById = useCallback(
    async (postId: number) => {
      try {
        await axiosInstance.delete(`${API_ENDPOINTS.POST}/${postId}`);
        dispatch(deletePost(postId));
      } catch (error: any) {
        notification.error({
          message: error.message,
          duration: 1,
        });
      }
    },
    [dispatch]
  );

  const showUpdatePost = useCallback(
    (post: Post) => {
      console.log(post);
      dispatch(setPostDetail({ post }));
    },
    [dispatch]
  );

  const handleGetPostScroll = useCallback(
    async (page: number) => {
      try {
        const { data } = await axiosInstance.get(
          `${API_ENDPOINTS.POST}?limit=${PAGINATION.LIMIT}&offset=${
            PAGINATION.OFFSET * (page - 1)
          }`
        );
        dispatch(addPostScroll({ posts: data.posts }));
        setPage(page);
      } catch (error: any) {
        notification.error({
          message: error.message,
        });
      }
    },
    [dispatch]
  );

  const handleScrollTop = useCallback(
    (e: any, path: string) => {
      const element = e.target;
      if (element.scrollHeight === element.scrollTop + element.clientHeight) {
        if (path.includes(SCROLL_PATH.USER)) {
          return;
        }
        if (path.includes(SCROLL_PATH.HOME)) {
          handleGetPostScroll(page + 1);
        }
      }
    },
    [handleGetPostScroll, page]
  );

  const getComments = useCallback(
    async (postId) => {
      setIsLoading(true);
      setPage(page + 1);
      try {
        const offsetNewComment =
          commentStore.find((item) => item.postId === postId)?.newComment || 0;

        const {
          data: { comments },
        } = await axiosInstance.get(
          `${API_ENDPOINTS.COMMENT}?limit=${PAGINATION.LIMIT}&offset=${
            PAGINATION.OFFSET * (page - 1) + offsetNewComment
          }&postId=${postId}`
        );

        dispatch(getCommentPost({ comments, postId }));
      } catch (error) {}
    },
    [commentStore, dispatch, page]
  );

  const deleteCommentById = useCallback(
    async (id, postId) => {
      try {
        await axiosInstance.delete(`${API_ENDPOINTS.COMMENT}/${id}`);
        dispatch(deleteComment({ id, postId }));
      } catch (error: any) {
        notification.error({
          message: error.message,
          duration: 1,
        });
      }
    },
    [dispatch]
  );

  const handleCreateReply = useCallback(
    async ({ id, images, content, mentions, isUpdate, postId, commentId }) => {
      const dataBody = {
        ownerId: loggedUser?.id,
        content,
        mentions: mentions.map((item: MentionSearch) => item.userId),
        images,
        postId,
        commentId,
      };
      if (isUpdate) {
        const {
          data: { reply },
        } = await axiosInstance.put(`${API_ENDPOINTS.REPLY}/${id}`, dataBody);
        dispatch(updateReplyById({ reply, commentId }));
      } else {
        try {
          const {
            data: { reply },
          } = await axiosInstance.post(API_ENDPOINTS.REPLY, dataBody);
          dispatch(createReply({ reply, commentId }));
        } catch (error: any) {
          notification.error({
            message: error.response.message || error.message,
          });
        }
      }
      setInitial();
    },
    [dispatch, loggedUser?.id]
  );

  const getAllReplies = useCallback(
    async (commentId) => {
      console.log(commentId);
      setIsLoading(true);
      setPage(page + 1);
      try {
        const offsetNewReply =
          repliesStore.find((item) => item.commentId === commentId)
            ?.newReplies || 0;

        const {
          data: { replies },
        } = await axiosInstance.get(
          `${API_ENDPOINTS.REPLY}?limit=${PAGINATION.LIMIT}&offset=${
            PAGINATION.OFFSET * (page - 1) + offsetNewReply
          }&commentId=${commentId}`
        );

        dispatch(getRepliesComment({ replies, commentId }));
      } catch (error: any) {
        notification.error({
          message: error.response.message || error.message,
        });
      }
    },
    [dispatch, page, repliesStore]
  );

  const deleteReplyById = useCallback(
    async (id, commentId, postId) => {
      try {
        await axiosInstance.delete(`${API_ENDPOINTS.REPLY}/${id}`);
        dispatch(deleteReply({ id, commentId, postId }));
      } catch (error: any) {
        notification.error({
          message: error.message,
          duration: 1,
        });
      }
    },
    [dispatch]
  );

  const [reaction, setReaction] = useState<{
    text: string;
    value: number;
    key: string;
  } | null>(null);

  const handleCreateReaction = useCallback(
    async ({
      vote,
      postId = null,
      commentId = null,
      replyId = null,
      postIdComment = null,
      replyIdComment = null,
      userId,
    }) => {
      try {
        const {
          data: { reaction },
        } = await axiosInstance.post(API_ENDPOINTS.REACTIONS, {
          vote,
          postId,
          commentId,
          replyId,
          userId,
        });
        postId && dispatch(changeReactionPost({ postId, vote }));
        commentId &&
          dispatch(
            changeReactionComment({ commentId, postId: postIdComment, vote })
          );
        replyId &&
          dispatch(
            changeReactionReply({ vote, replyId, commentId: replyIdComment })
          );
      } catch (error: any) {
        notification.error({
          message: error.message,
        });
      }
    },
    [dispatch]
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
    isLoadingPost,
    getPost,
    setLinkPreview,
    setPage,
    deletePostById,
    showUpdatePost,
    handleScrollTop,
    handleCommentSubmit,
    getComments,
    commentUpdated,
    setCommentUpdated,
    deleteCommentById,
    visibleComment,
    setVisibleComment,
    handleCreateReply,
    getAllReplies,
    deleteReplyById,
    reaction,
    setReaction,
    handleCreateReaction,
  };
};

export default usePost;
