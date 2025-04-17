import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Error } from './pages/Error'
import App from './App'
import { useState, useEffect } from 'react'
import { authService } from './services/authService'
import { Register } from './pages/Register'
import { PostDetail } from './pages/PostDetail'
import { CreatePost } from './pages/CreatePost'

export const Router = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        setLoading(false);
    }, []);
    
    // Composant pour routes protégées (admin seulement)
    const AdminRoute = ({ element }) => {
        return currentUser && currentUser.is_admin ? element : <Navigate to="/login" />;
    };

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
                    path: '/register',
                    element: <Register />,
                },
                {
                    path: '/posts/:id',
                    element: <PostDetail />,
                },
                {
                    path: '/create-post',
                    element: <AdminRoute element={<CreatePost />} />,
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
