import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: []
};

export const plantStatus = createSlice({
  name: "plantStatus",
  initialState,
  reducers: {
    dispatchPlantStatus: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { dispatchPlantStatus } = plantStatus.actions;

export default plantStatus.reducer;
