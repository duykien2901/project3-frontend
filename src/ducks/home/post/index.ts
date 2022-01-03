import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "src/ducks/user";
import { MentionSearch } from "./mentions/hook";

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
}

type InitialState = {
  posts: Post[];
  totalPost: number;
  postDetail: Post | null;
  isShowPostPopup: boolean;
};

const initialState: InitialState = {
  posts: [],
  postDetail: null,
  totalPost: 0,
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
  },
});

export const {
  updatePostById,
  setAllPost,
  setPostDetail,
  createPost,
  deletePost,
  addPostScroll,
} = actions;

export default reducer;
