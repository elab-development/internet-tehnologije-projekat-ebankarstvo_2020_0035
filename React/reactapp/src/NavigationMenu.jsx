import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Icon.css";

const NavigationMenu = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed); //Prati da li je meni proširen ili ne
  };

  const navigate = useNavigate();
  function handleLogout(event) {
    event.preventDefault();

    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-warning fixed-top py-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          Home
        </Link>
        <button
          className={`navbar-toggler ${isNavCollapsed ? "" : "collapsed"}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/transfer">
                Transfer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/exchange">
                Exchange
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics">
                Statistics
              </Link>
            </li>
          </ul>
        </div>
        <div className="social-icons">
          <a href="https://twitter.com/Mobi_Banka" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>

          <a
            href="https://www.facebook.com/MobiBankaRS/"
            className="social-icon"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.mobibanka.rs/sr/o-nama/mobi-banka/kontakt/"
            className="social-icon"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
