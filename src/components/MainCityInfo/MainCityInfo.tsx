import React from 'react'
import { CityInfo, HourlyForecast } from '../../types/types'
import { Card, Grid, CardMedia, Typography, Container } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { iconUrl } from '../../api/weather'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WindPowerIcon from '@mui/icons-material/WindPower'
import CloudIcon from '@mui/icons-material/Cloud'
import { getTimeFromTimestamp } from '../../utils'

const MainCityInfo = ({ cityInfo, weather }: { cityInfo: CityInfo; weather: HourlyForecast }) => {
    const theme = useTheme()

    return (
        <Card sx={{ p: 3, pb: 2, mb: 3 }}>
            <Grid container mb={1} justifyContent={'space-between'}>
                <Grid item xs={12} sm={6} md justifyContent='center' display={'flex'}>
                    <CardMedia
                        component='img'
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '100px',
                            maxWidth: '100px',
                            mr: 0,
                        }}
                        image={`${iconUrl}${weather.weather[0].icon}.png`}
                        alt='wheater'
                    />
                    <Container disableGutters>
                        <Typography gutterBottom variant='h5' component='h4' align='left' mt={2}>
                            <ThermostatIcon fontSize='medium' />
                            {weather.main.temp} °C
                        </Typography>
                        <Typography variant='subtitle1' component='p' align='left'>
                            {weather.weather[0].description.at(0)?.toUpperCase() +
                                weather.weather[0].description.slice(1)}
                        </Typography>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6} md={4} justifyContent='center' mb={2}>
                    <Typography variant='h3' component='h3' align='center' mb={1}>
                        {cityInfo.name}
                    </Typography>
                    <Grid container justifyContent={'center'}>
                        <Grid
                            item
                            xs
                            display={'flex'}
                            alignContent={'center'}
                            justifyContent={'center'}
                        >
                            <CloudIcon fontSize='medium' />
                            <Typography component='p' align='center' ml={1}>
                                {weather.clouds.all} %
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs
                            display={'flex'}
                            alignContent={'center'}
                            justifyContent={'center'}
                        >
                            <WindPowerIcon fontSize='medium' />
                            <Typography component='p' align='center' ml={1}>
                                {weather.wind.speed} m/s
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs display='flex' alignItems={'center'}>
                    <Grid container>
                        <Grid
                            item
                            xs={6}
                            md={12}
                            display={'flex'}
                            alignContent={'end'}
                            justifyContent={'center'}
                        >
                            <Typography
                                component='p'
                                align='center'
                                variant='subtitle2'
                                mx={1}
                                color={theme.palette.text.secondary}
                                sx={{ lineHeight: '2' }}
                            >
                                Sunset:
                            </Typography>
                            <Typography
                                component='p'
                                align='left'
                                variant='subtitle1'
                                mx={1}
                                width={'60px'}
                            >
                                {getTimeFromTimestamp(cityInfo.sunrise)}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            md={12}
                            display={'flex'}
                            alignContent={'end'}
                            justifyContent={'center'}
                        >
                            <Typography
                                component='p'
                                align='center'
                                variant='subtitle2'
                                mx={1}
                                color={theme.palette.text.secondary}
                                sx={{ lineHeight: '2' }}
                            >
                                Sunset:
                            </Typography>
                            <Typography
                                component='p'
                                align='left'
                                variant='subtitle1'
                                mx={1}
                                width={'60px'}
                            >
                                {getTimeFromTimestamp(cityInfo.sunset)}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            md={12}
                            display={'flex'}
                            alignContent={'end'}
                            justifyContent={'center'}
                        >
                            <Typography
                                component='p'
                                align='center'
                                variant='subtitle2'
                                mx={1}
                                color={theme.palette.text.secondary}
                                sx={{ lineHeight: '2' }}
                            >
                                Presure:
                            </Typography>
                            <Typography
                                component='p'
                                align='left'
                                variant='subtitle1'
                                mx={1}
                                width={'60px'}
                            >
                                {weather.main.pressure} mm
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            md={12}
                            display={'flex'}
                            alignContent={'center'}
                            justifyContent={'center'}
                        >
                            <Typography
                                component='p'
                                align='center'
                                variant='subtitle2'
                                mx={1}
                                color={theme.palette.text.secondary}
                                sx={{ lineHeight: '2' }}
                            >
                                Huminity:
                            </Typography>
                            <Typography
                                component='p'
                                align='left'
                                variant='subtitle1'
                                mx={1}
                                width={'60px'}
                            >
                                {weather.main.humidity} %
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MainCityInfo
