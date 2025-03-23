// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  goal: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get user goal
const getGoal = (state, action) => {
  state.goal = action.payload;
};

// Update user goal
export const updateGoal = createAsyncThunk(
  "goals/update",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "/api/goals/" + goalData.id,
        { text: goalData.text },
        config,
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const singleGoalSlice = createSlice({
  name: "singleGoalTaker",
  initialState,
  reducers: {
    // setGoal: (state, action) => {
    //     state.goal = action.payload
    // },
    setGoal: getGoal,
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goal = action.payload;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setGoal, reset } = singleGoalSlice.actions;

export default singleGoalSlice.reducer;
