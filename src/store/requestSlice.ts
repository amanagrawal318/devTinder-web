import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Request } from "./types";

const initialState: Request[] = [];

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    addRequest: (_state, action: PayloadAction<Request[]>) => {
      return action.payload;
    },
    removeRequest: (state, action: PayloadAction<string>) => {
      return state.filter((request) => request._id !== action.payload);
    },
    clearRequests: () => {
      return [];
    },
  },
});

export const { addRequest, removeRequest, clearRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
