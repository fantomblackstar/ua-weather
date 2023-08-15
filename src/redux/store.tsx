import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './home/homeSlice'
import cityReducer from './oneCity/citySlice'

export const store = configureStore({
    reducer: {
        home: homeReducer,
        city: cityReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
