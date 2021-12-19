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
};

const initialState: InitialState = {
  loggedUser: null,
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
  },
});

export const { setUser, signOut } = actions;

export default reducer;
