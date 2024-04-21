import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/noteSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});
