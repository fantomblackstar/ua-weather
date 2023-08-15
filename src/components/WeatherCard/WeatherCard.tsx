import React, { useState, useEffect } from 'react'
import { Grid, Button, Card, CardMedia, Typography, CircularProgress } from '@mui/material'
import { ShortWeatherData } from '../../types/types'
import { iconUrl } from '../../api/weather'
import { useNavigate } from 'react-router-dom'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import EjectIcon from '@mui/icons-material/Eject'
import WindPowerIcon from '@mui/icons-material/WindPower'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import CloudIcon from '@mui/icons-material/Cloud'
import { useDispatch } from 'react-redux'
import { updateCityWeather } from '../../redux/home/homeThunks'
import { AppDispatch } from '../../redux/store'

const WeatherCard = ({ card }: { card: ShortWeatherData }) => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        setIsUpdating(false)
    }, [card])

    const onViewCardClick = () => {
        navigate(`/weather/${card.name}`)
    }

    const onUpdateCardClick = () => {
        setIsUpdating(true)
        dispatch(updateCityWeather(card.name))
    }

    return (
        <Grid item xs={12} sm={6} md={4} boxSizing='border-box'>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    boxSizing: 'border-box',
                }}
            >
                {isUpdating ? (
                    <Grid
                        container
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
                        <Grid container mb={1}>
                            <Grid item xs justifyContent='center'>
                                <CardMedia
                                    component='img'
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: '100px',
                                        maxHeight: '100px',
                                        mr: 0,
                                    }}
                                    image={`${iconUrl}${card.weather[0].icon}.png`}
                                    alt='wheater'
                                />
                            </Grid>
                            <Grid item xs={8} justifyContent='center'>
                                <Typography
                                    gutterBottom
                                    variant='h6'
                                    component='h3'
                                    mt={1}
                                    align='right'
                                >
                                    {card.name}
                                </Typography>
                                <Typography component='p' align='right'>
                                    {card.weather[0].description.at(0)?.toUpperCase() +
                                        card.weather[0].description.slice(1)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container mb={1}>
                            <Grid
                                item
                                justifyContent='center'
                                alignContent='end'
                                xs={6}
                                display='flex'
                                mt={1}
                            >
                                <ThermostatIcon fontSize='large' />
                                <Typography variant='h5' component='h3' align='left'>
                                    {card.main.temp} °C
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component='p' align='center'>
                                    <EjectIcon color='error' fontSize='small' />
                                    {card.main.temp_max} °C
                                </Typography>
                                <Typography component='p' align='center'>
                                    <EjectIcon
                                        color='info'
                                        fontSize='small'
                                        style={{ transform: 'rotate(180deg)' }}
                                    />
                                    {card.main.temp_min} °C
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={'space-around'} mb={2}>
                            <Grid
                                item
                                xs
                                display='flex'
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <WindPowerIcon fontSize='medium' />
                                <Typography component='p' align='center' mx={1}>
                                    {card.wind.speed} m/s{' '}
                                </Typography>
                                <ArrowRightAltIcon
                                    fontSize='small'
                                    style={{ transform: `rotate(${card.wind.deg - 90}deg)` }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs
                                display='flex'
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <CloudIcon fontSize='medium' />
                                <Typography component='p' align='center' mx={1}>
                                    {card.clouds.all} %{' '}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent='space-between' mt={'auto'}>
                            <Button variant='contained' size='medium' onClick={onViewCardClick}>
                                View
                            </Button>
                            <Button variant='outlined' size='medium' onClick={onUpdateCardClick}>
                                Update
                            </Button>
                        </Grid>
                    </>
                )}
            </Card>
        </Grid>
    )
}

export default WeatherCard
