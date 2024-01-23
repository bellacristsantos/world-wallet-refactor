import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import auth from "./utils/auth";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

export default function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [currency, setCurrency] = useState("USD");

  return (
    <>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} setCurrency={setCurrency} />
        <Dashboard
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
          currency={currency}
        />
      </Router>
    </>
  );
}
