// const resMoisures = await get24SolidMoistures();
//     const resHumidities = await get24SolidHumidities();
//     const resTemperatures = await get24SolidTemperatures();

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataDayMoisures: {},
  dataDayHumidities: {},
  dataDayTemperatures: {},
};

export const dataDayChart = createSlice({
  name: "dataDayChart",
  initialState,
  reducers: {
    setDataCharts: (state, action) => {
      state.dataDayMoisures = action.payload.dataDayMoisures;
      state.dataDayHumidities = action.payload.dataDayHumidities;
      state.dataDayTemperatures = action.payload.dataDayTemperatures;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataCharts } = dataDayChart.actions;

export default dataDayChart.reducer;
