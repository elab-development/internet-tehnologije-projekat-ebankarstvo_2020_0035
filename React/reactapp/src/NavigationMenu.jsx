import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Icon.css";
import axios from "axios";

const NavigationMenu = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed); //Prati da li je meni proširen ili ne
  };

  const navigate = useNavigate();
  function handleLogout(event) {
    const config = {
      method: "post",
      url: "api/logout",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    };
    event.preventDefault();
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("role");
    axios(config);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-warning relative-top py-0">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={sessionStorage.getItem("auth_token") ? "/dashboard" : "/"}
        >
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
          disabled={sessionStorage.getItem("auth_token") ? false : true}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            {sessionStorage.getItem("auth_token") && (
              <li className="nav-item">
                <Link className="nav-link" to="/transfer">
                  Transfer
                </Link>
              </li>
            )}
            {sessionStorage.getItem("auth_token") && (
              <li className="nav-item">
                <Link className="nav-link" to="/statistics">
                  Statistics
                </Link>
              </li>
            )}
            {sessionStorage.getItem("auth_token") && (
              <li className="nav-item">
                <Link className="nav-link" to="/exchange">
                  Exchange
                </Link>
              </li>
            )}
            {sessionStorage.getItem("role") === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/adminPage">
                  Admin Page
                </Link>
              </li>
            )}
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
          {sessionStorage.getItem("auth_token") && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
