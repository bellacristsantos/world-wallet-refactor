import React, { useEffect, useState } from "react";
import "./Accounts.css";
import PlaidLinkUS from "./PlaidLinkUS";
import PlaidLinkES from "./PlaidLinkES";
import PlaidLinkGB from "./PlaidLinkGB";

export default function Accounts({
  token,
  updateToken,
  updateData,
  updateLoading,
  loading,
  data,
  isAuthenticated,
  currency,
  balances,
  setBalances,
  liabilities,
  setLiabilities,
}) {
  const exchangeRates = {
    USD: 1,
    GBP: 0.79, // Updated: Jan 16 @ 17:06
    EUR: 0.92, // Updated: Jan 16 @ 17:06
  };

  console.log("Balances:", balances)
  console.log("Liabilities:", liabilities)

  useEffect(() => {
    if (!loading && data != null) {
      // Create deep copies for USD, EUR, and GBP
      const dataUSD = JSON.parse(JSON.stringify(data));
      const dataEUR = JSON.parse(JSON.stringify(data));
      const dataGBP = JSON.parse(JSON.stringify(data));

      // Function to perform currency conversion
      const convertCurrency = (dataArray, targetCurrency) => {
        return dataArray.map((account) => {
          const copiedAccount = { ...account };
          copiedAccount.balances.iso_currency_code = targetCurrency;

          const exchangeRate =
            exchangeRates[copiedAccount.balances.iso_currency_code];

          if (exchangeRate) {
            if (copiedAccount.balances.available && !copiedAccount.balances.current) {
              copiedAccount.balances.available = Number(
                (
                  parseFloat(copiedAccount.balances.available) * exchangeRate
                ).toFixed(2)
              );
            } else {
              copiedAccount.balances.current = Number(
                (
                  parseFloat(copiedAccount.balances.current) * exchangeRate
                ).toFixed(2)
              );
            }
          } else {
            console.error(
              `Exchange rate not available for ${account.balances.iso_currency_code}`
            );
          }

          return copiedAccount;
        });
      };

      // Convert each copy to the respective currency
      const fullUSD = convertCurrency(dataUSD, "USD");
      const fullEUR = convertCurrency(dataEUR, "EUR");
      const fullGBP = convertCurrency(dataGBP, "GBP");

      // Set the balances based on the selected currency
      if (currency === "USD") {
        // Filter depository and investment accounts
        const balancesUSD = fullUSD.filter(
          (account) =>
            account.type === "depository" || account.type === "investment"
        );

        // Filter credit and loan accounts
        const liabilitiesUSD = fullUSD.filter(
          (account) => account.type === "credit" || account.type === "loan"
        );

        setBalances(balancesUSD);
        setLiabilities(liabilitiesUSD);
      } else if (currency === "EUR") {
        // Filter depository and investment accounts
        const balancesEUR = fullEUR.filter(
          (account) =>
            account.type === "depository" || account.type === "investment"
        );

        // Filter credit and loan accounts
        const liabilitiesEUR = fullEUR.filter(
          (account) => account.type === "credit" || account.type === "loan"
        );

        setBalances(balancesEUR);
        setLiabilities(liabilitiesEUR);
      } else if (currency === "GBP") {
        // Filter depository and investment accounts
        const balancesGBP = fullGBP.filter(
          (account) =>
            account.type === "depository" || account.type === "investment"
        );

        // Filter credit and loan accounts
        const liabilitiesGBP = fullGBP.filter(
          (account) => account.type === "credit" || account.type === "loan"
        );

        setBalances(balancesGBP);
        setLiabilities(liabilitiesGBP);
      }
    }
  }, [loading, data, currency]);

  return (
    <>
      <div className="accounts-div">
        <div className="account-button-div">
          <PlaidLinkUS
            token={token}
            updateToken={updateToken}
            updateData={updateData}
            updateLoading={updateLoading}
            isAuthenticated={isAuthenticated}
          />
          <PlaidLinkES
            token={token}
            updateToken={updateToken}
            updateData={updateData}
            updateLoading={updateLoading}
            isAuthenticated={isAuthenticated}
          />
          <PlaidLinkGB
            token={token}
            updateToken={updateToken}
            updateData={updateData}
            updateLoading={updateLoading}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className="account-boxes">
          <div className="balances">
            <p>Balances</p>
            <ul className="balances-list">
              {!loading &&
                data != null &&
                balances.map((account, index) => (
                  <div key={index}>
                    <p>
                      {account.balances.available !== null
                        ? `${account.balances.available} ${account.balances.iso_currency_code}`
                        : `${account.balances.current} ${account.balances.iso_currency_code}`}
                    </p>
                    <p> {account.name} </p>
                  </div>
                ))}
            </ul>
          </div>
          <div className="liabilities">
            <p>Liabilities</p>
            <ul className="liabilities-list">
              {!loading &&
                data != null &&
                liabilities.map((account, index) => (
                  <div key={index}>
                    <p>
                      {account.balances.current !== null
                        ? `${account.balances.current} ${account.balances.iso_currency_code}`
                        : `${account.balances.available} ${account.balances.iso_currency_code}`}
                    </p>
                    <p> {account.name} </p>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
