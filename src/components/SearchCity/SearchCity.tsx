import React, { useState } from 'react'
import cities from '../../api/uaCities.json'
import { useTheme } from '@mui/material/styles'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { UaCity } from '../../types/types'

const citiesOptions: string[] = cities
    .filter(
        (city: UaCity) =>
            city.capital === 'primary' || city.capital === 'admin' || city.capital === 'minor',
    )
    .map((city: UaCity) => city.city)
    .sort((a: string, b: string) => a.localeCompare(b))

const SearchCity = ({ onAddNewCity }: { onAddNewCity: (arg: string) => void }) => {
    const theme = useTheme()
    const [selectedOption, setSelectedOption] = useState<string>('')

    const onSelectChange = (event: SelectChangeEvent) =>
        setSelectedOption(event.target.value as string)

    const onAddBtnClick = () => {
        setSelectedOption('')
        onAddNewCity(selectedOption || '')
    }

    return (
        <Container style={{ padding: '50px 0px' }} maxWidth='md'>
            <Typography
                variant='h5'
                component={'h4'}
                mb={2}
                align='center'
                color={theme.palette.text.primary}
            >
                Find your city
            </Typography>
            <Grid container direction={'column'} justifyContent={'center'}>
                <Grid item display={'flex'} justifyContent={'center'}>
                    <FormControl style={{ width: '200px', marginRight: '20px' }}>
                        <InputLabel id='select-label'>City</InputLabel>
                        <Select
                            labelId='select-label'
                            id='select'
                            value={selectedOption}
                            label='City'
                            onChange={onSelectChange}
                        >
                            {citiesOptions.map((city: string) => (
                                <MenuItem key={city} value={city}>
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant='contained' size='medium' onClick={onAddBtnClick}>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SearchCity
