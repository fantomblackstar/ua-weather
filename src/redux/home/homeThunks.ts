import { createAsyncThunk } from '@reduxjs/toolkit'
import { WeatherData, ShortWeatherData } from '../../types/types'
import { fetchWeatherData } from '../../api/weather'
import { kelvinToCelcius } from '../../utils'
import { setIsLoading } from './homeSlice'

export const fetchWeatherList = createAsyncThunk(
    'home/fetchWeatherList',
    async (cityList: string[], { dispatch, rejectWithValue }) => {
        dispatch(setIsLoading(true))
        try {
            const requests: Promise<any>[] = cityList.map((elem: any) => fetchWeatherData(elem))
            const res = await Promise.all(requests)
            dispatch(setIsLoading(false))
            return res
        } catch (err: any) {
            dispatch(setIsLoading(false))
            return rejectWithValue(err.message)
        }
    },
)

export const updateCityWeather = createAsyncThunk(
    'home/updateCityWeather',
    async (cityName: string, { rejectWithValue }) => {
        try {
            const res = await fetchWeatherData(cityName)
            return res
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    },
)

export const transforWeatherListData = (weatherList: WeatherData[]) => {
    const shortWeatherList: ShortWeatherData[] = weatherList.map((item: WeatherData) => {
        const shortWeather: ShortWeatherData = {
            weather: item.weather,
            name: item.name,
            id: item.id,
            wind: {
                ...item.wind,
                speed: Math.round(item.wind.speed * 3.6),
            },
            main: {
                ...item.main,
                temp: kelvinToCelcius(item.main.temp),
                feels_like: kelvinToCelcius(item.main.feels_like),
                temp_max: kelvinToCelcius(item.main.temp_max),
                temp_min: kelvinToCelcius(item.main.temp_min),
            },
            clouds: item.clouds,
        }
        return shortWeather
    })

    return shortWeatherList
}
