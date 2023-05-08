import { configureStore } from "@reduxjs/toolkit";
import contentReducer from './content';
export const store = configureStore({
  reducer: { content:contentReducer},
});
  