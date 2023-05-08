import {
    createBrowserRouter
} from 'react-router-dom';
import Home from '../pages/Home';
import OneSity from '../pages/OneSity';

export const router = createBrowserRouter([
    {
        path: '*',
        element: <Home />,
    },
    {
        path: '/weather/:sityId',
        element: <OneSity />,
    },
]);