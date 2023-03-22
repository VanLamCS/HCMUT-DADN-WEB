import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../features/user'

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer
  },
})