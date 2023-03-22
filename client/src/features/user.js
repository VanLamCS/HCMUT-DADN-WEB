import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log("check payload: ", action.payload);
      state.email = action.payload.email;
      state.name = action.payload.name;
      console.log("check nè: ", state.email, state.name);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
