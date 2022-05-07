import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  launches: [],
};

// A slice for launches with our 3 reducers
const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    getLaunches: (state) => {
      state.loading = true;
    },
    getLaunchesSuccess: (state, { payload }) => {
      state.launches = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getLaunchesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const { getLaunches, getLaunchesSuccess, getLaunchesFailure } =
  launchesSlice.actions;

// A selector
export const launchesSelector = (state) => state.launches;

// Asynchronous thunk action
export function fetchLaunches() {
  return async (dispatch) => {
    dispatch(getLaunches());

    try {
      const response = await fetch("https://api.spacexdata.com/v3/launches");
      const data = await response.json();

      dispatch(getLaunchesSuccess(data));
    } catch (error) {
      dispatch(getLaunchesFailure());
    }
  };
}

// The reducer
export default launchesSlice.reducer;
