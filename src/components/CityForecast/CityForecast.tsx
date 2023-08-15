import React from 'react'
import { Card, Grid, Typography, Container } from '@mui/material'
import { HourlyForecast } from '../../types/types'
import ForecastTemp from '../ForecastTemp/ForecastTemp'

import { useTheme } from '@mui/material/styles'

const CityForecast = ({ forecast }: { forecast: HourlyForecast[] }) => {
    const theme = useTheme()
    const temps = forecast.map((item: HourlyForecast) => item.main.temp)
    const time = forecast.map((item: HourlyForecast) => item.dt_txt.split(' ')[1])

    const cellValue = (value: string, index: number) => (
        <Typography
            key={index}
            sx={{
                width: 'calc(100%/8)',
                height: 'max-content',
                border: `1px solid ${theme.palette.background.paper}`,
                borderWidth: '0px 1px 0px 1px',
            }}
            color={index % 2 === 0 ? theme.palette.text.primary : theme.palette.text.secondary}
            component={'span'}
            variant='subtitle2'
            align='center'
        >
            {value}
        </Typography>
    )

    return (
        <Card sx={{ p: 3 }}>
            <Typography variant='h6' component={'h5'} align='left' mb={3}>
                Forecast
            </Typography>
            <Container
                sx={{
                    pb: 3,
                    '@media(max-width:780px)': {
                        overflowX: 'scroll'
                    }
                }}
            >
                <Grid container mb={3} minWidth={'700px'}>
                    <Grid item xs={2} display={'flex'} alignItems={'center'}>
                        <Typography variant='subtitle1' component={'p'}>
                            Temperature (°C):
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <ForecastTemp list={temps} />
                    </Grid>
                </Grid>
                <Grid container minWidth={'700px'}>
                    <Grid item xs={2} display={'flex'} alignItems={'center'}>
                        <Typography variant='subtitle1' component={'p'}>
                            Humidity
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Container sx={{ display: 'flex' }}>
                            {forecast.map((item: HourlyForecast, index: number) =>
                                cellValue(item.main.humidity.toString(), index),
                            )}
                        </Container>
                    </Grid>
                </Grid>
                <Grid container minWidth={'700px'}>
                    <Grid item xs={2} display={'flex'} alignItems={'center'}>
                        <Typography variant='subtitle1' component={'p'}>
                            Pressure (mm):
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Container sx={{ display: 'flex' }}>
                            {forecast.map((item: HourlyForecast, index: number) =>
                                cellValue(item.main.pressure.toString(), index),
                            )}
                        </Container>
                    </Grid>
                </Grid>
                <Grid container minWidth={'700px'}>
                    <Grid item xs={2} display={'flex'} alignItems={'center'}>
                        <Typography variant='subtitle1' component={'p'}>
                            Wind (m/s):
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Container sx={{ display: 'flex' }}>
                            {forecast.map((item: HourlyForecast, index: number) =>
                                cellValue(item.wind.speed.toString(), index),
                            )}
                        </Container>
                    </Grid>
                </Grid>
                <Grid container minWidth={'700px'}>
                    <Grid item xs={2}>
                        <Typography variant='subtitle1' component={'p'}>
                            Time:
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Container sx={{ display: 'flex' }}>
                            {time.map((time: string, index: number) =>
                                cellValue(time.slice(0, 5), index),
                            )}
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </Card>
    )
}

export default CityForecast
