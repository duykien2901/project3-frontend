import { AnyAction, combineReducers } from "redux";
import user, { signOut } from "./user";
import posts from "./home/post";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const appReducer = combineReducers({
  user,
  posts,
});

type RootState = ReturnType<typeof appReducer>;

const reducer = (state: RootState | undefined, action: AnyAction) => {
  switch (action.type) {
    case signOut.type:
      return appReducer(undefined, action);

    default:
      return appReducer(state, action);
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
