import React, { useEffect, useCallback, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import "./PlaidLinkES.css";

export default function PlaidLinkES({
  updateData,
  updateLoading,
  isAuthenticated
}) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (isAuthenticated)
      getBalance();
  }, [isAuthenticated])

  const onSuccess = useCallback(
    async (publicToken) => {
      updateLoading(true);
      await fetch("http://localhost:8080/api/exchange_public_token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token: publicToken }),
      });
      await getBalance();
    },
    [updateLoading]
  );

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes("?oauth_state_id=")) {
      const linkToken = localStorage.getItem("link_token");
      setToken(linkToken);
    } else {
      const response = await fetch("http://localhost:8080/api/create_link_token/es");
      const data = await response.json();
      setToken(data.link_token);
      localStorage.setItem("link_token", data.link_token);
    }
  }, []);

  // Fetch balance data
  const getBalance = React.useCallback(async () => {
    updateLoading(true);
    const response = await fetch("http://localhost:8080/api/balance", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    updateData(data);
    updateLoading(false);
  }, [updateData, updateLoading]);

  let isOauth = false;

  const config = {
    token,
    onSuccess,
  };

  // For OAuth, configure the received redirect URI
  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }
  }, [token, isOauth, ready, open, createLinkToken]);

  return (
    <div>
      <button className="plaid-button" onClick={() => open()} disabled={!ready}>
        <strong>🇪🇸 Link ES account</strong>
      </button>
    </div>
  );
}
