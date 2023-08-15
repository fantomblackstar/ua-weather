import { createAsyncThunk } from '@reduxjs/toolkit'
import { HourlyForecast } from '../../types/types'
import { fetchForecastData } from '../../api/weather'
import { kelvinToCelcius, pressurePaToMM } from '../../utils'
import { setIsLoading } from './citySlice'

export const fetchCityForecast = createAsyncThunk(
    'cityWeather/fetchForecast',
    async (city: string, { dispatch, rejectWithValue }) => {
        dispatch(setIsLoading(true))

        try {
            const res = await fetchForecastData(city)
            return res
        } catch (err: any) {
            dispatch(setIsLoading(false))
            return rejectWithValue(err.message)
        }
    },
)

export const transformCityForecastData = (hourlyList: any) => {
    const forecast: HourlyForecast[] = hourlyList.map((hourlyItem: any) => ({
        ...hourlyItem,
        main: {
            temp: kelvinToCelcius(hourlyItem.main.temp),
            feels_like: kelvinToCelcius(hourlyItem.main.feels_like),
            temp_max: kelvinToCelcius(hourlyItem.main.temp_max),
            temp_min: kelvinToCelcius(hourlyItem.main.temp_min),
            pressure: pressurePaToMM(hourlyItem.main.pressure),
            humidity: hourlyItem.main.humidity,
        },
        wind: {
            ...hourlyItem.wind,
            speed: Math.round(hourlyItem.wind.speed * 3.6),
        },
    }))
    return forecast.slice(0, 9)
}
