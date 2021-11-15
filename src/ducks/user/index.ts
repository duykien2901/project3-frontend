import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  email: string;
  name: string;
  profileImage: string;
};

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
  },
});

export const { setUser } = actions;

export default reducer;
