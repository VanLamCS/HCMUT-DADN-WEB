// const dataTemperature = await getTemperature();
// const dataHumidity = await getHumidity();
// const dataSoildMoisture = await getSoildMoisture();

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperature: -1,
  humidity: -1,
  moisture: -1,
};

export const informationHome = createSlice({
  name: "informationHome",
  initialState,
  reducers: {
    getInformationHome: (state, action) => {
      state.temperature = action.payload.temperature;
      state.humidity = action.payload.humidity;
      state.moisture = action.payload.moisture;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getInformationHome } = informationHome.actions;

export default informationHome.reducer;
