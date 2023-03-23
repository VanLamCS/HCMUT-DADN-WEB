import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../features/user'
import dataDayChartReducer from '../features/dataChart'
import dataNotificationsReducer from '../features/notification'
import deviceStatusReducer from '../features/dataDashboard'
import informationHomeReducer from '../features/dataHome'

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    dataDayChart: dataDayChartReducer,
    dataNotifications: dataNotificationsReducer,
    deviceStatus: deviceStatusReducer,
    informationHome: informationHomeReducer
  },
})