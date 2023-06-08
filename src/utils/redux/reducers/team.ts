import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contention, Subpoint, Team } from "../../types";

type TeamState = {
    team: Team,
    contentions: Contention[],
};

const initialState = {
    team: {},
    contentions: [] as Contention[],
} as TeamState;

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setTeam: (state, action: PayloadAction<Team>) => {
            state.team = action.payload;
        },
        setTeamName: (state, action: PayloadAction<string>) => {
            state.team.teamName = action.payload;
        },
        addContention: (state) => {
            state.contentions.push({name: "", subpoints: []} as Contention);
        },
        addSupboint: (state, action: PayloadAction<number>) => {
            state.contentions[action.payload].subpoints.push("");
        },
        deleteContention: (state, action: PayloadAction<number>) => {
            state.contentions.splice(action.payload, 1);
        },
        deleteSubpoint: (state, action: PayloadAction<Subpoint>) => {
            state.contentions[action.payload.contention].subpoints.splice(action.payload.subpoint, 1);
        },
        setContentions: (state, action: PayloadAction<Contention[]>) => {
            state.contentions = action.payload;
        }
    },
});

export const {
    setTeam,
    setTeamName,
    addContention,
    addSupboint,
    setContentions,
    deleteContention,
    deleteSubpoint,

} = teamSlice.actions;

export default teamSlice;