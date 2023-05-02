import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./Model";

export const store = configureStore({
  reducer: { model: modelReducer },
});
  