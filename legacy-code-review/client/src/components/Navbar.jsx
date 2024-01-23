import React from "react";
import "./Navbar.css";
import logo from "../assets/worldwallet-logo.svg";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";

export default function Navbar({ isAuthenticated, setCurrency }) {
  return (
    <>
      <div className="title-row">
        <div className="title-div">
          <img src={logo} alt="" />
          <p>worldwallet</p>
        </div>
          <DropDown setCurrency={setCurrency}/>
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                  <Link to="/logout">Logout</Link>
              </>
            ) : (
              <>
                <div className="log-in">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
