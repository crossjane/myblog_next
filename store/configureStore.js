import reducer from "@/reducer";
import { createWrapper } from "next-redux-wrapper";

const { configureStore } = require("@reduxjs/toolkit");

const configureWebStroe = () => {
  const devMode = process.env.NODE_ENV === "development";

  const store = configureStore({
    reducer: reducer,
    devTools: devMode,
  });
  return store;
};

const store = configureWebStroe();

export const wrapper = createWrapper(() => store, {
  debug: process.env.NODE_ENV === "development",
});

export default store;
