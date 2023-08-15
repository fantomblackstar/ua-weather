import React, { useState } from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { useTheme } from '@mui/material/styles'
import { Box, Container, Grid, Input, AppBar, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import useLocalStorage from '../../hooks/useLocalStorage'

const Header = () => {
    const [userName, setUserName] = useLocalStorage<string>('myWeather_userName', 'UserName')
    const [isUserNameEditable, setIsUserNameEditable] = useState<boolean>(false)
    const theme = useTheme()

    const onEditableNameToggle = () => setIsUserNameEditable((prevState) => !prevState)

    const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setUserName(value)
    }

    return (
        <AppBar position='relative' sx={{ backgroundColor: theme.palette.info.dark }}>
            <Container maxWidth='md'>
                <Toolbar disableGutters>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item xs display={'flex'} alignContent={'center'}>
                            <WbSunnyIcon sx={{ mr: 2 }} />
                            <Typography variant='h6' color='inherit' noWrap>
                                <Link
                                    to={'/'}
                                    style={{
                                        textDecoration: 'none',
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    UaWeather
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        {!isUserNameEditable ? (
                            <Typography variant='subtitle1' color='inherit' noWrap>
                                {userName}
                                <EditIcon
                                    onClick={onEditableNameToggle}
                                    fontSize='small'
                                    sx={{ marginLeft: '10px', cursor: 'pointer' }}
                                />
                            </Typography>
                        ) : (
                            <Box sx={{ width: '150px', display: 'flex', alignItems: 'center' }}>
                                <Input value={userName} onChange={onUserNameChange} />
                                <CheckIcon
                                    onClick={onEditableNameToggle}
                                    fontSize='small'
                                    sx={{ marginLeft: '10px', cursor: 'pointer' }}
                                />
                            </Box>
                        )}
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
