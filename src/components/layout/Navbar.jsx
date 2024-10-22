import { useState } from "react"
import { NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import './../../App.css'

const NavBar = () => {

    const [showAccount, setShowAccount] = useState(false);

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 sticky-top ">
            <div className="container-fluid">
                <Link to={"/"} className="nav-link">
                    <span className="navbar-brand">lakeside Hotel</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                Browse all rooms
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={'/admin'}>
                                Admin
                            </Link>
                        </li>
                    </ul>
                    <ul className="d-flex navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/find-bookings'}>
                                Find Bookings
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className={`nav-link dropdown-toggle ${showAccount ? 'show' : ''}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                Account
                            </a>
                            <ul className={`dropdown-menu ${showAccount ? 'show' : ''}`}>
                                <li><Link to={'/login'} className="dropdown-item ">Login</Link></li>
                                <li><Link to={'/profile'} className="dropdown-item">Profile</Link></li>
                                <li><Link to={'/logout'} className="dropdown-item">Logout</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar