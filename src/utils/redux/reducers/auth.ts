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
        clearUser: (state) => {
            state.user.displayName = "";
            state.user.email = "";
            state.user.photoURL = "";
            state.user.uid = "";
            state.isLoggedIn = false;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.user.userName = action.payload
        },
    },
});

export const {
  setUser,
  clearUser,
  setUserName,
} = authSlice.actions;

export default authSlice;