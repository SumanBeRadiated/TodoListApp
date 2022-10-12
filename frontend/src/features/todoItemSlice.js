import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todoFirstTimeLoading: true,
  todoLoading: false,
  todoData: [],
  displayedData: [],
  todoError: "",
  lastAddedId: -1,
  displayedCatId: -1,
};

export const fetchTodoItem = createAsyncThunk(
  "todoItem/fetch",
  async (accessToken) => {
    return await axios
      .get("/api/lists/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.data);
  }
);

export const adderTodo = createAsyncThunk(
  "todoItem/add",
  async (tempp, thunkAPI) => {
    const { data } = await axios.post("/api/lists/", tempp.data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tempp.token}`,
      },
    });
    await thunkAPI.dispatch(fetchTodoItem(tempp.token));
    return data;
  }
);

export const updateTodo = createAsyncThunk(
  "todoItem/update",
  async (data, thunkAPI) => {
    await axios.put("/api/lists/", data.data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    setTimeout(() => {
      thunkAPI.dispatch(fetchTodoItem(data.accessToken));
    }, 1000);
  }
);

const todoItemSlice = createSlice({
  name: "todoItem",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      const tempData = state.todoData.filter(
        (item) => item["cat"] === action.payload
      );
      state.displayedData = tempData;
      state.displayedCatId = action.payload;
    },
    resetLastAddedItem: (state) => {
      state.lastAddedId = -1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoItem.pending, (state) => {
      state.todoLoading = true;

      state.todoError = "";
    });
    builder.addCase(fetchTodoItem.fulfilled, (state, action) => {
      if (action.payload.length > 0) {
        if (
          state.displayedCatId === -1 ||
          !action.payload.find((item) => item["cat"] === state.displayedCatId)
        ) {
          const tempData = action.payload.filter(
            (item) => item["cat"] === action.payload[0].cat
          );
          state.displayedData = tempData;
          state.displayedCatId = action.payload[0].cat;
        } else {
          const tempData = action.payload.filter(
            (item) => item["cat"] === state.displayedCatId
          );
          state.displayedData = tempData;
        }
      } else {
        state.displayedData = [];
      }

      state.todoFirstTimeLoading = false;
      state.todoLoading = false;
      state.todoData = action.payload;

      state.todoError = "";
    });
    builder.addCase(fetchTodoItem.rejected, (state) => {
      state.todoLoading = false;
      state.todoError = "Error occured";
    });
    builder.addCase(adderTodo.pending, (state) => {
      state.lastAddedId = -1;
    });
    builder.addCase(adderTodo.fulfilled, (state, action) => {
      state.lastAddedId = action.payload["id"];
    });
  },
});

export const todoItemReducer = todoItemSlice.reducer;
export const todoItemAction = todoItemSlice.actions;
