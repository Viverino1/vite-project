import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type PublicState = {
    users: User[];
    topics: string[];
};

const initialState = {
    users: [],
    topics: [],
} as PublicState;

export const publicSlice = createSlice({
    name: "public",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setTopics: (state, action: PayloadAction<string[]>) => {
            state.topics = action.payload;
        },
    },
});

export const {
    setUsers,
    setTopics,
} = publicSlice.actions;

export default publicSlice;