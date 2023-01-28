import { createSlice } from "@reduxjs/toolkit";
import { checkToken, login, register, signOut } from "../../services/services";
import { setToken, getToken } from "../../utils/HelperFunctions";

export const initialState = {
  token: null,
  loading: false,
  userData: {},
  severity: "",
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clear: (state, action) => {
      state.severity = "";
      state.message = "";
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      const { payload } = action;
      state.userData = payload.userData;
      state.token = payload.token;
      setToken(payload.token);
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.severity = payload.severity;
      state.message = payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      const { severity, message } = action.payload;
      state.severity = severity;
      state.message = message;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.userData = {};
      state.token = null;
    },
    [checkToken.pending]: (state, action) => {
      state.loading = true;
    },
    [checkToken.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload.hasOwnProperty("isValid") && payload.isValid) {
        state.token = getToken();
        state.userData = payload.userData;
      } else {
        state.token = null;
        state.userData = {};
        setToken(null);
      }
      state.loading = false;
    },
    [checkToken.rejected]: (state, action) => {
      state.loading = false;
    },
    [signOut.pending]: (state, action) => {
      state.loading = true;
    },
    [signOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = {};
      state.token = null;
    },
    [signOut.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { clear } = authSlice.actions;

export default authSlice.reducer;
