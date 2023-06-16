import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PublicState = {
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
        setTopics: (state, action: PayloadAction<string[]>) => {
            state.topics = action.payload;
        },
    },
});

export const {
    setTopics,
} = publicSlice.actions;

export default publicSlice;