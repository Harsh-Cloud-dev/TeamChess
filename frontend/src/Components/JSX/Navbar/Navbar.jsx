import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../CSS/Navbar/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark team-navbar">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold logo-text" href="#">
          ♟️ Team<span>Chess</span>
        </a>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Play</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Tournaments</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Learn</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Community</a></li>
          </ul>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-success login-btn">Login</button>
            <button className="btn btn-success signup-btn">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
