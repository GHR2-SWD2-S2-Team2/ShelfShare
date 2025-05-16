import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/cartContext";
import { FavoriteContext } from "../../Context/favoriteContext";
import logo from '../../assets/logo.png';
import './BtnStyle.css';

export default function Navbar() {
  const { cartCount } = useContext(CartContext);
  const { favoritesCount } = useContext(FavoriteContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand d-lg-none" to="/">
            <img src={logo} alt="Logo" style={{ height: '40px' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" onClick={() => setIsOpen((prev) => !prev)}></span>
          </button>

          <div className={`w-full lg:flex lg:items-center ${isOpen ? "block" : "hidden"}`}>
            <div className="left-section d-flex flex-row gap-3 me-auto mt-3 mt-lg-0">
              <Link to="/events" className="text-decoration-none cool-button">
                <i className="bi bi-calendar-event"></i> Events
              </Link>
              <Link to="/about" className="text-decoration-none cool-button">
                <i className="bi bi-book"></i> About
              </Link>
            </div>

            <div className="d-flex flex-column align-items-center flex-grow-1 search-bar my-3 my-lg-0">
              <img src={logo} alt="Logo" className="logo mb-2 d-none d-lg-block" />
            </div>

            <div className="right-section d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
              <div className="d-flex gap-2">
                <Link to="/signup" className="nav-auth-btn text-decoration-none text-brown fw-bold">
                  Sign up
                </Link>
                <span>____________</span>
                <Link to="/login" className="nav-auth-btn text-decoration-none text-brown fw-bold">
                  Login
                </Link>
              </div>

              <ul className="list-unstyled d-flex gap-4 align-items-center m-0">
                <li className="position-relative">
                  <Link to="/Cart" className="text-decoration-none text-center d-block">
                    <i className="bi bi-cart n-icon fs-5"></i>
                    {cartCount > 0 && (
                      <span className="badge rounded-pill bg-brown position-absolute">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="position-relative">
                  <Link to="/Favorite" className="text-decoration-none text-center d-block">
                    <i className="fa-regular n-icon fa-heart fs-5"></i>
                    {favoritesCount > 0 && (
                      <span className="badge rounded-pill bg-brown position-absolute">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-nav d-sm-flex d-lg-flex justify-content-center align-items-center flex-row flex-lg-row container-fluid">
        <ul className="gap-4 d-flex flex-row flex-nowrap py-4 px-4 mb-2">
          <li className="active"><Link to="/">Home</Link></li>
          <li className="not_active"><Link to="/books">Books </Link></li>
          <li className="not_active"><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    </>
  );
}