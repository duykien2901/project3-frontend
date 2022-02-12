import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  email: string;
  name: string;
  userId?: string;
  profileImage?: string;
}

type InitialState = {
  loggedUser: User | null;
  userProfile: User | null;
};

const initialState: InitialState = {
  loggedUser: null,
  userProfile: null,
};

const { reducer, actions } = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: InitialState,
      action: PayloadAction<{ user: User | null }>
    ) => {
      const { user } = action.payload;
      state.loggedUser = user;
    },
    signOut: (state) => {
      return state;
    },
    setUserProfile: (
      state: InitialState,
      action: PayloadAction<{ user: User | null }>
    ) => {
      const { user } = action.payload;
      state.userProfile = user;
    },
  },
});

export const { setUser, signOut, setUserProfile } = actions;

export default reducer;
