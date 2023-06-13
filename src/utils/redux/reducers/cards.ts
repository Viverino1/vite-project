import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Evidence, Quote, Rebuttal } from "../../types";

type CardsState = {
    evidences: Evidence[],
    rebuttals: Rebuttal[],
    quotes: Quote[],
};

const initialState = {
    evidences: [],
    rebuttals: [],
    quotes: [],
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
        setQuoteCards: (state, action: PayloadAction<Quote[]>) => {
            state.quotes = action.payload;
        },
    },
});

export const {
    setEvidenceCards,
    setRebuttalCards,
    setQuoteCards,
} = cardsSlice.actions;

export default cardsSlice;