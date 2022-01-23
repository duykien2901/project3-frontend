import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove, reverse } from "lodash";
import { User } from "src/ducks/user";
import { MentionSearch } from "./mentions/hook";

export interface Reply extends Comment {}
export interface Comment {
  id: number;
  content: string;
  groupId?: number | null;
  owner: User;
  images: string[];
  mentions: MentionSearch[];
  createdAt: Date;
  updatedAt: Date;
  totalReplies: number;
  replies?: Reply[];
  postId: number;
}

export interface Reply {
  id: number;
  content: string;
  owner: User;
  images: string[];
  mentions: MentionSearch[];
  createdAt: Date;
  updatedAt: Date;
  postId: number;
  commentId: number;
}

export interface Comments {
  postId: number;
  commentsPost: Comment[];
  newComment: number;
}

export interface RepliesComment {
  commentId: number;
  replies: Reply[];
  newReplies: number;
}
export interface Post {
  id: number;
  content: string;
  groupId: number | null;
  owner: User;
  images: string[];
  mentions: MentionSearch[];
  modeHide: number;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  totalComment: number;
}

type InitialState = {
  posts: Post[];
  totalPost: number;
  postDetail: Post | null;
  commentDetail: Comment | null;
  comments: Comments[];
  isShowPostPopup: boolean;
  repliesComment: RepliesComment[];
};

const initialState: InitialState = {
  posts: [],
  postDetail: null,
  commentDetail: null,
  totalPost: 0,
  comments: [],
  isShowPostPopup: false,
  repliesComment: [],
};

const { reducer, actions } = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPost: (
      state: InitialState,
      action: PayloadAction<{ posts: Post[]; total: number }>
    ) => {
      const { posts, total } = action.payload;
      state.posts = posts;
      state.totalPost = total;
    },
    addPostScroll: (
      state: InitialState,
      action: PayloadAction<{ posts: Post[] }>
    ) => {
      const { posts } = action.payload;
      state.posts = [...state.posts, ...posts];
    },
    setPostDetail: (
      state: InitialState,
      action: PayloadAction<{ post: Post | null }>
    ) => {
      state.postDetail = action.payload.post;
    },
    createPost: (
      state: InitialState,
      action: PayloadAction<{ post: Post }>
    ) => {
      const { post } = action.payload;
      state.posts = [post, ...state.posts];
    },
    deletePost: (state: InitialState, action: PayloadAction<number>) => {
      const postId = action.payload;
      state.posts = [...state.posts].filter((item) => item.id !== postId);
    },
    setIsShowPostPopup: (
      state: InitialState,
      action: PayloadAction<boolean>
    ) => {
      state.isShowPostPopup = action.payload;
    },
    updatePostById: (
      state: InitialState,
      action: PayloadAction<{ post: Post }>
    ) => {
      const { post } = action.payload;
      const indexPost: number = state.posts.findIndex(
        (item) => item.id === post.id
      );
      state.posts[indexPost] = post;
    },
    getCommentPost: (
      state: InitialState,
      action: PayloadAction<{ comments: Comment[]; postId: number }>
    ) => {
      const { comments, postId } = action.payload;
      const indexReply = state.comments.findIndex(
        (item) => item.postId === postId
      );
      if (indexReply > -1) {
        state.comments[indexReply].commentsPost = [
          ...comments,
          ...state.comments[indexReply].commentsPost,
        ];
      } else {
        state.comments = [
          ...state.comments,
          { commentsPost: comments, postId, newComment: 0 },
        ];
      }
    },
    createComment: (
      state: InitialState,
      action: PayloadAction<{ comment: Comment; postId: number }>
    ) => {
      const { comment, postId } = action.payload;
      const indexReply = state.comments.findIndex(
        (item) => item.postId === postId
      );
      if (indexReply > -1) {
        state.comments[indexReply].commentsPost = [
          ...state.comments[indexReply].commentsPost,
          comment,
        ];
        state.comments[indexReply].newComment =
          state.comments[indexReply].newComment + 1;
      } else {
        state.comments = [
          ...state.comments,
          { commentsPost: [comment], postId, newComment: 1 },
        ];
      }
    },
    updateCommentById: (
      state: InitialState,
      action: PayloadAction<{ comment: Comment; postId: number }>
    ) => {
      const { comment, postId } = action.payload;
      const indexReplyPost: number = state.comments.findIndex(
        (item) => item.postId === postId
      );
      const indexReply = state.comments[indexReplyPost].commentsPost.findIndex(
        (item) => item.id === comment.id
      );

      state.comments[indexReplyPost].commentsPost[indexReply] = comment;
    },
    deleteComment: (
      state: InitialState,
      action: PayloadAction<{ id: number; postId: number }>
    ) => {
      const { id, postId } = action.payload;
      const indexReply: number = state.comments.findIndex(
        (item) => item.postId === postId
      );
      remove(state.comments[indexReply].commentsPost, (item) => item.id === id);
      const indexPost: number = state.posts.findIndex(
        (item) => item.id === postId
      );
      state.posts[indexPost].totalComment =
        state.posts[indexPost].totalComment - 1;
    },
    createReply: (
      state: InitialState,
      action: PayloadAction<{ reply: Reply; commentId: number }>
    ) => {
      const { reply, commentId } = action.payload;
      const indexReply = state.repliesComment.findIndex(
        (item) => item.commentId === commentId
      );
      if (indexReply > -1) {
        state.repliesComment[indexReply].replies = [
          ...state.repliesComment[indexReply].replies,
          reply,
        ];
        state.repliesComment[indexReply].newReplies =
          state.repliesComment[indexReply].newReplies + 1;
      } else {
        state.repliesComment = [
          ...state.repliesComment,
          { replies: [reply], commentId, newReplies: 1 },
        ];
      }
    },
    getRepliesComment: (
      state: InitialState,
      action: PayloadAction<{ replies: Reply[]; commentId: number }>
    ) => {
      const { replies, commentId } = action.payload;
      const indexReply = state.repliesComment.findIndex(
        (item) => item.commentId === commentId
      );
      if (indexReply > -1) {
        state.repliesComment[indexReply].replies = [
          ...replies,
          ...state.repliesComment[indexReply].replies,
        ];
      } else {
        state.repliesComment = [
          ...state.repliesComment,
          { replies: replies, commentId, newReplies: 0 },
        ];
      }
    },
    updateReplyById: (
      state: InitialState,
      action: PayloadAction<{ reply: Reply; commentId: number }>
    ) => {
      const { reply, commentId } = action.payload;
      const indexCommentPost: number = state.repliesComment.findIndex(
        (item) => item.commentId === commentId
      );
      const indexReply = state.repliesComment[
        indexCommentPost
      ].replies.findIndex((item) => item.id === reply.id);

      state.repliesComment[indexCommentPost].replies[indexReply] = reply;
    },
    deleteReply: (
      state: InitialState,
      action: PayloadAction<{ id: number; commentId: number; postId: number }>
    ) => {
      const { id, commentId, postId } = action.payload;
      const indexReply: number = state.repliesComment.findIndex(
        (item) => item.commentId === commentId
      );
      remove(
        state.repliesComment[indexReply].replies,
        (item) => item.id === id
      );

      const indexComment = state.comments.findIndex(
        (item) => item.postId === postId
      );
      const indexReplyInComment = state.comments[
        indexComment
      ].commentsPost.findIndex((item) => item.id === commentId);

      state.comments[indexComment].commentsPost[
        indexReplyInComment
      ].totalReplies =
        state.comments[indexComment].commentsPost[indexReplyInComment]
          .totalReplies - 1;
    },
  },
});

export const {
  updatePostById,
  setAllPost,
  setPostDetail,
  createPost,
  deletePost,
  addPostScroll,
  getCommentPost,
  createComment,
  updateCommentById,
  deleteComment,
  createReply,
  getRepliesComment,
  updateReplyById,
  deleteReply,
} = actions;

export default reducer;
