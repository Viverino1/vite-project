import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Evidence, Rebuttal } from "../../types";

type CardsState = {
    evidences: Evidence[],
    rebuttals: Rebuttal[],
};

const initialState = {
    evidences: [],
    rebuttals: [],
} as CardsState;

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setEvidenceCards: (state, action: PayloadAction<Evidence[]>) => {
            state.evidences = action.payload;
        },
        setRebuttalCards: (state, action: PayloadAction<Rebuttal[]>) => {
            state.rebuttals = action.payload;
        },
    },
});

export const {
    setEvidenceCards,
    setRebuttalCards,
} = cardsSlice.actions;

export default cardsSlice;