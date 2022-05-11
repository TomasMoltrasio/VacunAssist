import React from "react";
import "@styles/Header.scss";
import logoMain from "@logos/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="navbar-left">
        <Link to="/">
          <img src={logoMain} alt="logo" className="nav-logo" />
        </Link>
        <ul>
          <li>{/* <a href="/">All</a> */}</li>
          <li>{/* <a href="/">Clothes</a> */}</li>
          <li>{/* <a href="/">Electronics</a> */}</li>
          <li>{/* <a href="/">Furnitures</a> */}</li>
          <li>{/* <a href="/">Toys</a> */}</li>
          <li>{/* <a href="/">Others</a> */}</li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          {/* <li className="navbar-email">Aministrador</li> */}
          {/* <li className="navbar-shopping-cart">Tomas Moltrasio</li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
