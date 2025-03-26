import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Error } from './pages/Error'
import App from './App'

export const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '*',
                    element: <Error />,
                }
            ],
        }
    ]);

    return (
            <RouterProvider router={router} />
    )
};
