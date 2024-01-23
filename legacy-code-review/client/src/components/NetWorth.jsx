import "./NetWorth.css";

export default function NetWorth({
  loading,
  data,
  currency,
  balances,
  liabilities,
}) {
  let totalBalance = 0;
  let totalLiabilities = 0;
  let prettyBalance;
  let prettyLiabilities;
  let netWorth;

  if (!loading && data != null) {
    for (const account of balances) {
      if (account.balances.available !== null) {
        totalBalance += account.balances.available;
      } else {
        totalBalance += account.balances.current;
      }
    }

    for (const account of liabilities) {
      if (account.balances.current !== null) {
        totalLiabilities += account.balances.current;
      } else {
        totalLiabilities += account.balances.available;
      }
    }

    prettyBalance = Number(parseFloat(totalBalance).toFixed(2));
    prettyLiabilities = Number(parseFloat(totalLiabilities).toFixed(2));
    netWorth = Number(parseFloat(prettyBalance - prettyLiabilities).toFixed(2));
  }

  return (
    <>
      <div className="networth-div">
        <div className="networth-box">
          <div className="networth-text">
            <p className="p1">Total net worth ({currency})</p>
            <p className="p2">{netWorth}</p>
          </div>
        </div>
        <div className="global-breakdown">
          <p className="p3">Global Breakdown</p>
          <p className="p4">Balances: {prettyBalance}</p>
          <p className="p5">Liabilities: {prettyLiabilities}</p>
        </div>
      </div>
    </>
  );
}
