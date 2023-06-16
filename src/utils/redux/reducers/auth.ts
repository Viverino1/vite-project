import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type AuthState = {
  user: User,
  isLoggedIn: boolean,
};

const initialState = {
  user: {},
  isLoggedIn: false,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isLoggedIn = true;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.user.userName = action.payload
        },
        setSpeakerNumber: (state, action: PayloadAction<number>) => {
            state.user.speaker = action.payload;
        },
        setTeamID: (state, action: PayloadAction<string>) => {
            state.user.teamID = action.payload;
        }
    },
});

export const {
  setUser,
  setUserName,
  setSpeakerNumber,
  setTeamID,
} = authSlice.actions;

export default authSlice;