import React, { useMemo, useState } from 'react'
import Container from '@mui/material/Container'
import Input from '@mui/material/Input'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import { ShortWeatherData } from '../../types/types'
import WeatherCard from '../WeatherCard/WeatherCard'
import useDebounce from '../../hooks/useDebounce'

const CardsAlbum = ({ cardsList }: { cardsList: ShortWeatherData[] }) => {
    const [filter, setFilter] = useState('')
    const debouncedFilter = useDebounce<string>(filter)

    const filteredCards: ShortWeatherData[] = useMemo(() => {
        return cardsList.filter((card: ShortWeatherData) => !!card.name.match(debouncedFilter))
    }, [cardsList, debouncedFilter])

    const onFilterInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value)
    }

    const theme = useTheme()
    return (
        <Container maxWidth='md'>
            <Grid container justifyContent={'space-between'} mb={2}>
                <Grid item xs>
                    <Typography variant='h6' color={theme.palette.text.primary} noWrap mb={2}>
                        Weather list
                    </Typography>
                </Grid>
                <Grid item xs={4} md={3} display={'flex'} alignItems={'center'}>
                    <Input value={filter} onChange={onFilterInputChange} />
                    <SearchIcon />
                </Grid>
            </Grid>
            {filteredCards.length === 0 && debouncedFilter && (
                <Typography component={'h5'} variant='subtitle1' align='center'>
                    Nothing found
                </Typography>
            )}
            {filteredCards.length === 0 && debouncedFilter.length === 0 && (
                <Typography component={'h5'} variant='subtitle1' align='center'>
                    Please add a new city to your list
                </Typography>
            )}
            {filteredCards.length > 0 && (
                <Grid container spacing={2} mb={10}>
                    {filteredCards.map((card: ShortWeatherData) => (
                        <WeatherCard key={card.id} card={card} />
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default CardsAlbum
