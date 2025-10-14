import React, { useState } from "react";
import "../../CSS/Navbar/Navbar.css";

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        ♟️ <span>TeamChess</span>
      </div>

      <ul className={`nav-links ${menuActive ? "active" : ""}`}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Play</a></li>
        <li><a href="#">Tournaments</a></li>
        <li><a href="#">Learn</a></li>
        <li><a href="#">Community</a></li>
      </ul>

      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="signup">Sign Up</button>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
