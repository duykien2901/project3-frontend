import { combineReducers } from "redux";
import user from "./user";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["user"],
};

const appReducer = combineReducers({
  user,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
