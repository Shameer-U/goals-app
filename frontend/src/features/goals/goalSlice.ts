import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import goalService from "./goalService";
import { RootState } from "../../app/store";

interface Goal {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GoalState {
  goals: Goal[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: GoalState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createGoal = createAsyncThunk<
  Goal,
  Goal,
  { state: RootState; rejectValue: string }
>(
  "goals/create",
  async (
    goalData: Goal,
    thunkAPI: {
      getState: () => RootState;
      rejectWithValue: (value: string) => any;
    },
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message ?? "");
    }
  },
);

//Get user goals
export const getGoals = createAsyncThunk<
  Goal[],
  void,
  { state: RootState; rejectValue: string }
>(
  "goals/getAll",
  async (
    _,
    thunkAPI: {
      getState: () => RootState;
      rejectWithValue: (value: string) => any;
    },
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await goalService.getGoals(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message ?? "");
    }
  },
);

// Delete user goal
export const deleteGoal = createAsyncThunk<
  { id: string },
  string,
  { state: RootState; rejectValue: string }
>(
  "goals/delete",
  async (
    id: string,
    thunkAPI: {
      getState: () => RootState;
      rejectWithValue: (value: string) => any;
    },
  ) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (error: any) {
      const message: string =
        error?.response?.data?.message?.toString() ||
        error?.message?.toString() ||
        error?.toString() ||
        "";

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(
        createGoal.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload ?? "An error occurred";
        },
      )
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(
        getGoals.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload ?? "An error occurred";
        },
      )
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteGoal.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.goals = state.goals.filter(
            (goal: any) => goal._id !== action.payload.id,
          );
        },
      )
      .addCase(
        deleteGoal.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload ?? "An error occurred";
        },
      );
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
