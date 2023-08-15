import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { Container, CircularProgress, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, AppState } from '../../redux/store'
import { fetchWeatherList } from '../../redux/home/homeThunks'
import CardsAlbum from '../../components/CardsAlbum/CardsAlbum'
import SearchCity from '../../components/SearchCity/SearchCity'
import useLocalStorage from '../../hooks/useLocalStorage'

const Home = () => {
    const { isLoading, error, weatherDataList } = useSelector((state: AppState) => state.home)
    const dispatch = useDispatch<AppDispatch>()
    const theme = useTheme()
    const [citiesList, setCitiesList] = useLocalStorage<string[]>('myWeather_citiesList', ['Kyiv'])

    useEffect(() => {
        dispatch(fetchWeatherList(citiesList))
    }, [citiesList])

    const onAddNewCity = (name: string) => {
        if (!citiesList.includes(name)) setCitiesList([...citiesList, name])
    }

    return (
        <Container
            sx={{
                backgroundColor: theme.palette.background.default,
                minHeight: 'calc(100vh - 64px)',
            }}
        >
            <SearchCity onAddNewCity={onAddNewCity} />
            {isLoading && (
                <Grid container justifyContent={'center'} mt={10}>
                    <CircularProgress />
                </Grid>
            )}
            {!isLoading && !error && <CardsAlbum cardsList={weatherDataList} />}
        </Container>
    )
}

export default Home
