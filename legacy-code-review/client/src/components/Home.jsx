import React, { useEffect, useState } from "react";
import "./Home.css";
import NetWorth from "./NetWorth";
import Accounts from "./Accounts";
import Graph from "./Graph";
import SavingsGoals from "./SavingsGoals";

export default function Home({ isAuthenticated, currency }) {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balances, setBalances] = useState([]);
  const [liabilities, setLiabilities] = useState([]);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const updateData = (newData) => {
    setData(newData);
  };

  const updateLoading = (newLoading) => {
    setLoading(newLoading);
  };

  useEffect(() => {
    // Add data from authenticated user on db
  }, []);

  return (
    <>
      <div className="first-row">
        <NetWorth
          loading={loading}
          data={data}
          currency={currency}
          balances={balances}
          liabilities={liabilities}
        />
        <Accounts
          token={token}
          updateToken={updateToken}
          updateData={updateData}
          updateLoading={updateLoading}
          loading={loading}
          data={data}
          isAuthenticated={isAuthenticated}
          currency={currency}
          balances={balances}
          setBalances={setBalances}
          liabilities={liabilities}
          setLiabilities={setLiabilities}
        />
      </div>
      <div className="second-row">
        {/* <Graph />
        <SavingsGoals /> */}
      </div>
    </>
  );
}
