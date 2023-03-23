import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../features/user'
import dataDayChartReducer from '../features/dataChart'

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    dataDayChart: dataDayChartReducer
  },
})