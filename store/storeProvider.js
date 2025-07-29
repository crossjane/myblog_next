"use client";

import { Provider } from "react-redux";
import store from "./configureStore";

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
