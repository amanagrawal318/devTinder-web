import { createSlice } from "@reduxjs/toolkit";
import type { User } from "./types";

const initialState: Array<User> = [];

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeedData: (state, action) => {
      return action.payload;
    },
    clearFeedData: () => {
      return [];
    },
  },
});

export const { addFeedData, clearFeedData } = feedSlice.actions;
export default feedSlice.reducer;
