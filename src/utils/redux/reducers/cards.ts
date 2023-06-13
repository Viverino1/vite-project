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
        removeEvidenceCard: (state, action: PayloadAction<string>) => {
            state.evidences = state.evidences.filter(card => card.cardID != action.payload);
        },
        newEvidenceCard: (state, action: PayloadAction<Evidence>) => {
            state.evidences.push(action.payload);
        },

        setRebuttalCards: (state, action: PayloadAction<Rebuttal[]>) => {
            state.rebuttals = action.payload;
        },
        removeRebuttalCard: (state, action: PayloadAction<string>) => {
            state.rebuttals = state.rebuttals.filter(card => card.cardID != action.payload);
        },
        newRebuttalCard: (state, action: PayloadAction<Rebuttal>) => {
            state.rebuttals.push(action.payload);
        },

        setQuoteCards: (state, action: PayloadAction<Quote[]>) => {
            state.quotes = action.payload;
        },
        removeQuoteCard: (state, action: PayloadAction<string>) => {
            state.quotes = state.quotes.filter(card => card.cardID != action.payload);
        },
        newQuoteCard: (state, action: PayloadAction<Quote>) => {
            state.quotes.push(action.payload);
        },
    },
});

export const {
    setEvidenceCards,
    removeEvidenceCard,
    newEvidenceCard,

    setRebuttalCards,
    removeRebuttalCard,
    newRebuttalCard,

    setQuoteCards,
    removeQuoteCard,
    newQuoteCard,
} = cardsSlice.actions;

export default cardsSlice;