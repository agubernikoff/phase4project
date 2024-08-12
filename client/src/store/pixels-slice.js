import { createSlice } from "@reduxjs/toolkit";

const pixelsSlice = createSlice({
  name: "pixels",
  initialState: { pixels: [], edits: [], chat: "" },
  reducers: {
    setPixels(state, action) {
      state.pixels = action.payload;
    },
    updatePixels(state, action) {
      const updatedPixel = action.payload;
      const filtered = [...state.pixels].filter(
        (p) => p.id !== updatedPixel.id
      );
      const sorted = [...filtered, updatedPixel].sort((a, b) => a.id - b.id);
      state.pixels = sorted;
    },
    setEdits(state, action) {
      state.edits = [...state.edits, action.payload];
    },
    setChat(state, action) {
      state.chat = action.payload;
    },
  },
});

export const pixelsActions = pixelsSlice.actions;

export default pixelsSlice;
