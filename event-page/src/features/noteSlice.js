import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: null,
  },

  reducers: {
    setNote: (state, action) => {
      state.note = action.payload;
    },
  },
});

export const { setNote } = noteSlice.actions;

export const selectNote = (state) => state.note.note;

export default noteSlice.reducer;
