import { configureStore } from "@reduxjs/toolkit";
import modelReducer from './model'
export const store = configureStore({
  reducer: { model: modelReducer },
});
  