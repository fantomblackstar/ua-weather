import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShortWeatherData } from '../../types/types'
import { fetchWeatherList, transforWeatherListData, updateCityWeather } from './homeThunks'

export type HomeState = {
    weatherDataList: Array<ShortWeatherData> | []
    isLoading: boolean
    error: string
}

const initialState: HomeState = {
    weatherDataList: [],
    isLoading: false,
    error: '',
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherList.fulfilled, (state, action) => {
            const res = transforWeatherListData(action.payload)
            state.weatherDataList = res
        }),
            builder.addCase(fetchWeatherList.rejected, (state, action) => {
                state.error = action.error.message || 'Unknown Error'
            }),
            builder.addCase(updateCityWeather.fulfilled, (state, action) => {
                const res = transforWeatherListData([action.payload])
                const updatedCity = res[0]
                const updatedList: ShortWeatherData[] = state.weatherDataList.map((city: ShortWeatherData) => city.name === updatedCity.name ? updatedCity : city)
                state.weatherDataList = updatedList
            }),
            builder.addCase(updateCityWeather.rejected, (state, action) => {
                state.error = action.error.message || 'Unknown Error'
            })
    },
})

export const { setIsLoading, setError } = homeSlice.actions
export default homeSlice.reducer
