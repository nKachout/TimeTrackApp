import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeToken } from "../utils/HelperFunctions";
import { authHeader } from "../utils/HelperFunctions";

export const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const response = await fetch(
      `http://127.0.0.1:8080/user/login`,
      requestOptions
    ).then((resp) => resp.json());
    if( response.hasOwnProperty("severity") ){
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const register = createAsyncThunk("auth/register", async (payload) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const response = await fetch(
      `http://127.0.0.1:8080/user/signup`,
      requestOptions
    ).then((resp) => resp.json());
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
  console.log("signout");
  removeToken();
});

export const checkToken = createAsyncThunk("auth/checkToken", async () => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({}),
    };

    const response = await fetch(
      `http://127.0.0.1:8080/user/checkTokenValid`,
      requestOptions
    ).then((resp) => resp.json());
    return response;
  } catch (error) {
    console.log(error);
  }
});
