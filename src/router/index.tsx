import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom'
import Home from '../pages/Home'
import OneSity from '../pages/OneSity'
import RootLayout from '../components/layout/RootLayout'

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<RootLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/weather/:cityName' element={<OneSity />} />
        </Route>,
    ),
)
