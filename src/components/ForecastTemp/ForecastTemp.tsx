import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Typography, Container } from '@mui/material'

const ForecastTemp = ({ list }: { list: number[] }) => {
    const maxTemp = Math.max(...list)
    const theme = useTheme()

    return (
        <Container sx={{ display: 'flex' }}>
            {list.map((temp: number, index: number) => (
                <Typography
                    key={index}
                    sx={{
                        mt: maxTemp - temp,
                        backgroundColor: theme.palette.background.paper,
                        width: 'calc(100%/8)',
                        height: 'max-content',
                    }}
                    component={'span'}
                    variant='subtitle2'
                    align='center'
                >
                    +{temp}
                </Typography>
            ))}
        </Container>
    )
}

export default ForecastTemp
