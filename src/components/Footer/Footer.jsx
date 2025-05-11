import React from 'react';
import './FooterStyle.css';
import { Link } from "react-router-dom";
import payOne from '../../assets/icon-pay-01.png';
import payTwo from '../../assets/icon-pay-02.png';
import payThree from '../../assets/icon-pay-03.png';
import payFour from '../../assets/icon-pay-04.png';
import payFive from '../../assets/icon-pay-05.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row mt-4">

          <div className="col-6 contact">
            <h4 className=' title'>GET IN TOUCH</h4>
            <p className="text-white num">
              Any questions? Call us on (+1) 96 716 6879
            </p>
            <div className="d-flex flex-row gap-4 text-decoration-none">
              <Link to="#" className="social-icon">
                <i className="fa-brands fa-github"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i className="fa-brands fa-linkedin"></i>
              </Link>
              <Link to="#" className="social-icon">
                <i className="fa-brands fa-x-twitter"></i>
              </Link>
            </div>
          </div>

          <div className="col-6 ">
            <h4 className="title">Made by:</h4>
            <h3 className='text-white team'>ShelfShare Team</h3>
          </div>
        </div>

        <div className="payment-methods">
          <div className="flex-c-m flex-w text-decorate-none d-flex justify-content-center align-items-center">
            <Link to="#" className="m-all-1">
              <img src={payOne} alt="ICON-PAY" />
            </Link>
            <Link to="#" className="m-all-1">
              <img src={payTwo} alt="ICON-PAY" />
            </Link>
            <Link to="#" className="m-all-1">
              <img src={payThree} alt="ICON-PAY" />
            </Link>
            <Link to="#" className="m-all-1">
              <img src={payFour} alt="ICON-PAY" />
            </Link>
            <Link to="#" className="m-all-1">
              <img src={payFive} alt="ICON-PAY" />
            </Link>
          </div>

          <p className="text-white text-center mt-2">
            Copyright@2025 All rights reserved |
            Made with <i className="fa-regular fa-heart  fs-5"></i> by <a href="https://colorlib.com" className='text-decoration-none link' target="_blank" rel="noreferrer">Colorlib</a> & distributed by <a href="https://themewagon.com" className='text-decoration-none link' target="_blank" rel="noreferrer">ThemeWagon</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
