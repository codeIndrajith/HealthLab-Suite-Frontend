import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthSliceUser {
  id: string;
  name: string;
  email: string;
  user_role: string;
}

interface AuthSlice {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthSliceUser | null;
}

const initialState: AuthSlice = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      const user: AuthSliceUser = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        user_role: payload.user_role,
      };
      state.user = user;
      state.isAuthenticated = true;
    },
    updateAuthUser: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      const user: AuthSliceUser = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        user_role: payload.user_role,
      };
      state.user = user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },
  },
});

// selectors
export const selectAuthSlice = (state: RootState) => state.auth;
export const selectAuthSliceUser = (state: RootState) => state.auth.user;
export const selectAuthSliceIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

// actions
export const { setAuthUser, updateAuthUser, logout } = authSlice.actions;

// reducer
export default authSlice.reducer;
