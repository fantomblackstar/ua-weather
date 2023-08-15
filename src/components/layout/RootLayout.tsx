import React from 'react'
import Header from './Header'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <Box sx={{ backgroundColor: 'primary.background.default', m: 0 }}>
            <Header />
            <Outlet />
        </Box>
    )
}

export default RootLayout
