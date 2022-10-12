import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchTodoItem } from "./todoItemSlice";

const initialState = {
  catFirstTimeLoading: true,
  catLoading: true,
  catData: [],
  catError: "",
};

export const fetchCategory = createAsyncThunk("categoryList", async (token) => {
  return await axios
    .get("/api/category/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
});

export const delCategory = createAsyncThunk(
  "categoryList/remove",
  async (data, thunkAPI) => {
    await axios.put("/api/category/", data.data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    thunkAPI.dispatch(fetchCategory(data.token));
    thunkAPI.dispatch(fetchTodoItem(data.token));
  }
);

export const addCategory = createAsyncThunk(
  "categoryList/add",
  async (data, thunkAPI) => {
    await axios.post("/api/category/", data.data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
  }
);

const categoryListSlice = createSlice({
  name: "categoryList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.catLoading = true;

      state.catError = "";
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.catFirstTimeLoading = false;
      state.catLoading = false;

      state.catData = action.payload;
      state.catError = "";
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.catLoading = false;
      state.catData = [];
      state.catError = "Error Occured";
    });
    builder.addCase(addCategory.pending, (state) => {
      state.catLoading = true;
      state.catError = "";
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.catLoading = false;

      state.catError = "";
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.catLoading = false;
      state.catData = [];
      state.catError = "Error Occured";
    });
  },
});

export const categoryListReducer = categoryListSlice.reducer;
