import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetch", async (accessToken) => {
  const { data } = await axios.get("/api/user/profile/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
});

export const updateUser = createAsyncThunk("user/update", async (reqData) => {
  const { data } = await axios.put("/api/user/profile/", reqData.data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${reqData.accessToken}`,
    },
  });

  return data;
});

const initialState = {
  userDetail: {},
  userLoading: false,
  userError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.userLoading = true;
      state.userError = "";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.userLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.userDetail = {};
      state.userLoading = false;
      state.userError = "Error Occured";
    });
    builder.addCase(updateUser.pending, (state) => {
      state.userDetail = {};
      state.userLoading = true;
      state.userError = "";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.userLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.userDetail = {};
      state.userLoading = false;
      state.userError = "Error Occured";
    });
  },
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
