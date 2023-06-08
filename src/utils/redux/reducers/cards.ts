import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Evidence } from "../../types";

type CardsState = {
    evidences: Evidence[],
};

const initialState = {
    evidences: [],
} as CardsState;

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setEvidenceCards: (state, action: PayloadAction<Evidence[]>) => {
            state.evidences = action.payload;
        },
    },
});

export const {
    setEvidenceCards,
} = cardsSlice.actions;

export default cardsSlice;