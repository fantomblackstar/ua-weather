import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../redux/store'
import { fetchCityForecast } from '../../redux/oneCity/cityThunks'
import { useNavigate, useParams } from 'react-router-dom'
import { Grid, Container, CircularProgress, Button, Typography } from '@mui/material'
import MainCityInfo from '../../components/MainCityInfo/MainCityInfo'
import CityForecast from '../../components/CityForecast/CityForecast'
import useLocalStorage from '../../hooks/useLocalStorage'

const OneSity = () => {
    const { isLoading, error, cityInfo, forecast } = useSelector((state: AppState) => state.city)
    const [citiesList, setCitiesList] = useLocalStorage('myWeather_citiesList', [])
    const dispatch = useDispatch<AppDispatch>()
    const { cityName } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (cityName !== undefined) dispatch(fetchCityForecast(cityName))
    }, [cityName])

    const onDeleteCardClick = () => {
        setCitiesList(citiesList.filter((name: string) => name !== cityName))
        navigate('/')
    }

    return (
        <Container maxWidth='md' sx={{ pt: 10 }}>
            {!isLoading ? (
                <>
                    <MainCityInfo cityInfo={cityInfo} weather={forecast[0]} />
                    <CityForecast forecast={forecast.slice(1, 9)} />
                    <Button
                        variant='outlined'
                        color={'error'}
                        size='medium'
                        sx={{ mx: 'auto', display: 'block', my: 3 }}
                        onClick={onDeleteCardClick}
                    >
                        Delete City
                    </Button>
                </>
            ) : (
                <Grid container justifyContent={'center'} mt={10}>
                    <CircularProgress />
                </Grid>
            )}
            {error && forecast.length === 0 && (
                <Typography component={'p'} align='center'>
                    {error}
                </Typography>
            )}
        </Container>
    )
}

export default OneSity
