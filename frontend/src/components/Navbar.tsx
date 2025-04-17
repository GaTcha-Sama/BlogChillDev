import { Link } from 'react-router-dom'
import logo from '../assets/images/chilldev-logo.png'  

export const Navbar = () => {
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
                    <li className="nav-item">
                        <Link to="/login">Connexion</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register">Inscription</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}
