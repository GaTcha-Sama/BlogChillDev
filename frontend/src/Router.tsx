import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Error } from './pages/Error'
import App from './App'
import { Register } from './pages/Register'
import { PostDetail } from './pages/PostDetail'
import { CreatePost } from './pages/CreatePost'
import { useAuth } from './context/AuthContext'

// Composant pour routes protégées (admin seulement)
const AdminRoute = ({ element }) => {
    const { role } = useAuth();
    return role === 'admin' ? element : <Navigate to="/login" />;
};

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
