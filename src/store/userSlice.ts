import { createSlice } from "@reduxjs/toolkit";
import type { User } from "./types";

const initialState: {
  loading: boolean;
  data: User | undefined;
  error: string | undefined;
} = {
  loading: true,
  data: undefined,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = undefined;
    },
    updateUserField: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    updateError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addUser, removeUser, updateError, updateUserField } =
  userSlice.actions;
export default userSlice.reducer;
