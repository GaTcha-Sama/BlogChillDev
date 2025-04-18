import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/images/chilldev-logo.png'

export const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <Link className="logo" to="/"><img src={logo} alt="logo" width={100} height={150} /></Link>
          <div className="text-center">
            <h1>Bienvenue sur ChillDev</h1>
            <h5>Votre blog d'échanges entre développeurs</h5>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Accueil</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item user-info">
                  <span className="username">{user?.username}</span>
                  <button onClick={logout} className="btn btn-outline-danger btn-sm">Déconnexion</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">Connexion</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">Inscription</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <style >{`
        .navbar {
          background-color: #f8f9fa;
          padding: 1rem 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 1rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-item {
          margin: 0;
        }
        .nav-item a {
          color: #333;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        .nav-item a:hover {
          background-color: #e9ecef;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .username {
          font-weight: 500;
          color: #333;
        }
        .btn-outline-danger {
          border-color: #dc3545;
          color: #dc3545;
        }
        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  )
}
