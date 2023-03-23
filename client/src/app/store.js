import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../features/user'
import dataDayChartReducer from '../features/dataChart'
import dataNotificationsReducer from '../features/notification'

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    dataDayChart: dataDayChartReducer,
    dataNotifications: dataNotificationsReducer
  },
})