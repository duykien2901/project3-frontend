import store from "src/ducks";

export type RootState = ReturnType<typeof store.getState>;
