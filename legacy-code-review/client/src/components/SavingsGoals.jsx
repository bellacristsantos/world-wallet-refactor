import "./SavingsGoals.css";

export default function SavingsGoals() {
  return (
    <>
      <div className="savings-div">
        <div className="savings-button-div">
          <button>+</button>
        </div>
        <p>Savings Goals</p>
        <ul>
          {/* {items.map(( index) => (
              <li key={index}>{item}</li>
            ))} */}
        </ul>
      </div>
    </>
  );
}
