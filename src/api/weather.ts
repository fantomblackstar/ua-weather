const baseUrl = 'https://api.openweathermap.org/data/2.5'
export const iconUrl = 'http://openweathermap.org/img/wn/'

export const fetchWeatherData = async (city: string) => {
    const url = `${baseUrl}/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    return await (await fetch(url)).json()
}

export const fetchForecastData = async (city: string) => {
    const url = `${baseUrl}/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    return await (await fetch(url)).json()
}
