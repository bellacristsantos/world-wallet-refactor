import React, { useState } from "react";
import "./DropDown.css";

export default function DropDown({ setCurrency }) {

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setCurrency(selectedValue);
  };

  return (
    <>
      <div>
        <label>Default currency: </label>
        <select onChange={handleOptionChange}>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
          <option value="GBP">£ GBP</option>
        </select>
      </div>
    </>
  );
}
