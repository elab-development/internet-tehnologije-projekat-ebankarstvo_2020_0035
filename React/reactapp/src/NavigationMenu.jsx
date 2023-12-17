import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationMenu = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

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
              <Link className="nav-link" to="/statistics">
                Statistics
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;
