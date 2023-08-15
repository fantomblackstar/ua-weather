import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CityInfo, HourlyForecast } from '../../types/types'
import { fetchCityForecast, transformCityForecastData } from './cityThunks'

export type WeatherState = {
    forecast: HourlyForecast[]
    cityInfo: CityInfo
    isLoading: boolean
    error: string
}

const initialState: WeatherState = {
    cityInfo: {
        id: 0,
        name: '',
        coord: {
            lat: 0,
            lon: 0,
        },
        country: '',
        population: 0,
        timezone: 0,
        sunrise: 0,
        sunset: 0,
    },
    forecast: [],
    isLoading: true,
    error: '',
}

const citySlice = createSlice({
    name: 'cityWeather',
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
        builder.addCase(fetchCityForecast.fulfilled, (state, { payload }: any) => {
            state.forecast = transformCityForecastData(payload.list)
            state.cityInfo = payload.city
            state.isLoading = false
        }),
            builder.addCase(fetchCityForecast.rejected, (state, action: any) => {
                state.error = action.error.message || 'Unknown Error'
            })
    },
})

export const { setIsLoading, setError } = citySlice.actions
export default citySlice.reducer
