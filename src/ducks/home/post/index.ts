import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reverse } from "lodash";
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
  totalReplies?: number;
  replies?: Reply[];
}

export interface Comments {
  postId: number;
  commentsPost: Comment[];
  newComment: number;
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
};

const initialState: InitialState = {
  posts: [],
  postDetail: null,
  commentDetail: null,
  totalPost: 0,
  comments: [],
  isShowPostPopup: false,
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
      const indexComment = state.comments.findIndex(
        (item) => item.postId === postId
      );
      if (indexComment > -1) {
        state.comments[indexComment].commentsPost = [
          ...comments,
          ...state.comments[indexComment].commentsPost,
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
      const indexComment = state.comments.findIndex(
        (item) => item.postId === postId
      );
      if (indexComment > -1) {
        state.comments[indexComment].commentsPost = [
          ...state.comments[indexComment].commentsPost,
          comment,
        ];
        state.comments[indexComment].newComment =
          state.comments[indexComment].newComment + 1;
      } else {
        state.comments = [
          ...state.comments,
          { commentsPost: [comment], postId, newComment: 1 },
        ];
      }
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
} = actions;

export default reducer;
