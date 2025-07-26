import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

export type RequestStatus = "interested" | "ignored" | "accepted" | "rejected";

export interface Request {
    _id: string;
    fromUserId: User;
    toUserId: string;
    status: RequestStatus;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const initialState: Request[] = [];

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        addRequest: (state, action: PayloadAction<Request[]>) => {
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

export const { addRequest, removeRequest, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;
