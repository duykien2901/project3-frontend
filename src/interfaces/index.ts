import store from "src/ducks";

export type RootState = ReturnType<typeof store.getState>;

export interface Post {
  content: string;
  images: string[] | null;
}
