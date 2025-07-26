import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

const initialState: Array<User> = [];

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeedData: (state, action: PayloadAction<Array<User>>) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user._id !== action.payload);
    },
    clearFeedData: (): Array<User> => {
      return [];
    },
  },
});

export const { addFeedData, clearFeedData, removeUserFromFeed } =
  feedSlice.actions;
export default feedSlice.reducer;
