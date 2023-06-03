import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contention, Subpoint, Team } from "../../types";

type TeamState = {
    team: Team,
};

const initialState = {
    team: {},
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
            state.team.contentions.push({name: "", subpoints: []} as Contention);
        },
        addSupboint: (state, action: PayloadAction<number>) => {
            state.team.contentions[action.payload].subpoints.push("");
        },
        deleteContention: (state, action: PayloadAction<number>) => {
            state.team.contentions.splice(action.payload, 1);
        },
        deleteSubpoint: (state, action: PayloadAction<Subpoint>) => {
            state.team.contentions[action.payload.contention].subpoints.splice(action.payload.subpoint, 1);
        },
        setContentions: (state, action: PayloadAction<Contention[]>) => {
            state.team.contentions = action.payload;
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