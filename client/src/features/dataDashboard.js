// const resMoisures = await get24SolidMoistures();
//     const resHumidities = await get24SolidHumidities();
//     const resTemperatures = await get24SolidTemperatures();

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pumpStatus: -1,
  fanStatus: -1,
  ledStatus: -1,
  modeStatus: -1,
};

export const deviceStatus = createSlice({
  name: "deviceStatus",
  initialState,
  reducers: {
    getDeviceStatus: (state, action) => {
      console.log("check payload: ", action.payload)
      state.pumpStatus = action.payload.pumpStatus
      state.fanStatus = action.payload.fanStatus
      state.ledStatus = action.payload.ledStatus
      state.modeStatus = action.payload.modeStatus
    },
  },
});

// Action creators are generated for each case reducer function
export const { getDeviceStatus } = deviceStatus.actions;

export default deviceStatus.reducer;
