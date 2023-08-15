type Weather = {
    id: number
    main: string
    description: string
    icon: string
}

type WeatherMain = {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
}

type Clouds = {
    all: number
}

type Wind = {
    speed: number
    deg: number
}

export type WeatherData = {
    id: number
    weather: Weather[]
    main: WeatherMain
    wind: Wind
    sys: {
        country: string
        sunrise: number
        sunset: number
    }
    name: string
    clouds: Clouds
}

export type ShortWeatherData = Pick<
    WeatherData,
    'weather' | 'main' | 'name' | 'id' | 'wind' | 'clouds'
>

export type UaCity = {
    city: string
    lat: string
    lng: string
    country: string
    iso2: string
    admin_name: string
    capital: string
    population: string
    population_proper: string
}

export type CityInfo = {
    id: number
    name: string
    coord: {
        lat: number
        lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}

export type HourlyForecast = {
    dt: number
    main: WeatherMain
    weather: Weather[]
    clouds: Clouds
    wind: Wind
    visibility: number
    pop: number
    sys: {
        pod: string
    }
    dt_txt: string
}
