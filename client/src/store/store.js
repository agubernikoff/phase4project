import { configureStore } from "@reduxjs/toolkit";
import pixelsSlice from "./pixels-slice";

const store = configureStore({
  reducer: {
    pixels: pixelsSlice.reducer,
  },
});

export default store;
