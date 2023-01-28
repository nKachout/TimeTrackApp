import { configureStore } from '@reduxjs/toolkit'
import authReducer, { initialState } from './slices/authSlice'
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const stores = configureStore({
    initialState,
 reducer: {
 auth: authReducer
 },reduxDevtools
})