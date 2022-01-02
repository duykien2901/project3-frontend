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
};

const initialState: InitialState = {
  posts: [],
  postDetail: null,
  totalPost: 0,
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
    setPostDetail: (
      state: InitialState,
      action: PayloadAction<{ post: Post }>
    ) => {
      state.postDetail = action.payload.post;
    },
  },
});

export const { setAllPost, setPostDetail } = actions;

export default reducer;
