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
        editEvidenceCard: (state, action: PayloadAction<Evidence>) => {
            state.evidences = state.evidences.map((card) => {
                return card.cardID === action.payload.cardID? action.payload : card;
            })
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
        editRebuttalCard: (state, action: PayloadAction<Rebuttal>) => {
            state.rebuttals = state.rebuttals.map((card) => {
                return card.cardID === action.payload.cardID? action.payload : card;
            })
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
        editQuoteCard: (state, action: PayloadAction<Quote>) => {
            state.quotes = state.quotes.map((card) => {
                return card.cardID === action.payload.cardID? action.payload : card;
            })
        },
    },
});

export const {
    setEvidenceCards,
    removeEvidenceCard,
    newEvidenceCard,
    editEvidenceCard,

    setRebuttalCards,
    removeRebuttalCard,
    newRebuttalCard,
    editRebuttalCard,

    setQuoteCards,
    removeQuoteCard,
    newQuoteCard,
    editQuoteCard,
} = cardsSlice.actions;

export default cardsSlice;