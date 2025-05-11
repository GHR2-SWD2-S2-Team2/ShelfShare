import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/cartContext";
import logo from '../../assets/logo.png';
import './BtnStyle.css';

export default function Navbar() {
  const { item } = useContext(CartContext);

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
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="left-section d-flex gap-3 me-auto mt-3 mt-lg-0">
              <button className="cool-button">
                <i className="bi bi-calendar-event"></i> Events
              </button>
              <button className="cool-button">
                <i className="bi bi-book"></i> About
              </button>
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
                  <Link to="/Cart" className="text-decoration-none  text-center">
                    <i className="bi bi-cart n-icon fs-4"></i>
                  </Link>
                  {item && item.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brown">
                      {item.length}
                    </span>
                  )}
                </li>
                <li>
                  <Link to="/Favorite" className=" text-decoration-none text-center">
                    <i className="fa-regular n-icon fa-heart fs-5"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-nav d-sm-flex d-lg-flex justify-content-center align-items-center flex-row flex-lg-row container-fluid">
      <ul className=" gap-4 d-flex flex-row flex-nowrap py-4 px-4 mb-2">
          <li className="active"><Link to="/">Home</Link></li>
          <li className=" not_active" ><Link to="/books">Books </Link></li>
          <li className=" not_active" ><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    </>
  );
}