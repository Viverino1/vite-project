import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
    side: string,
    topic: string,
};

const initialState = {
    topic: "",
    side : "AFF",
} as AppState;

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSide: (state, action: PayloadAction<string>) => {
            state.side = action.payload;
        },
        setTopic: (state, action: PayloadAction<string>) => {
            state.topic = action.payload;
        },
    },
});

export const {
    setSide,
    setTopic,
} = appSlice.actions;

export default appSlice;