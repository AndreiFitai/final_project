import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navigation = props => {
  return (
    <div className="navigation">
      <div className="container nav-content">
        <div>
          <Link className="link nav-link logoAndName" to="/">
            <img id="logo" src={logo} alt="" />
            <h2>CoinBuddyBot</h2>
          </Link>
        </div>
        <div className="navControl">
          {props.user ? (
            <span>
              &nbsp; &nbsp; &nbsp;
              <Link className="link nav-link" to="/profile">
                Dashboard
              </Link>
              &nbsp; &nbsp; &nbsp;
              <Link className="link nav-link" to="/auth/logout">
                Logout
              </Link>
            </span>
          ) : (
            <span>
              <Link className="link nav-link" to="/auth/sign-in">
                Sign in
              </Link>
              &nbsp; &nbsp; &nbsp;
              <Link className="link nav-link" to="/auth/sign-up">
                Sign up
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
