import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [] as User[],
  reducers: {
    setConnections: (_state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
    addConnection: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    removeConnections: () => {
      return [];
    },
  },
});

export const { setConnections, addConnection, removeConnections } =
  connectionsSlice.actions;
export default connectionsSlice.reducer;
