import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: {}
};

export const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getDataNotification: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getDataNotification } = notification.actions;

export default notification.reducer;
