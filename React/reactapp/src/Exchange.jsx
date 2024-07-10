import React, { useState } from "react";
import useExchangeRates from "./useExchangeRates";
import "./Exchange.css";
import TransferForm from "./TransferForm";

function Exchange() {
  const { usdToEur, eurToUsd, loading, error } = useExchangeRates();
  const [usdAmount, setUsdAmount] = useState("");
  const [eurAmount, setEurAmount] = useState("");
  const [convertedToEur, setConvertedToEur] = useState(null);
  const [convertedToUsd, setConvertedToUsd] = useState(null);

  const handleUsdToEur = (event) => {
    event.preventDefault();
    if (usdToEur && usdAmount) {
      setConvertedToEur((usdAmount * usdToEur).toFixed(2));
    }
  };

  const handleEurToUsd = (event) => {
    event.preventDefault();
    if (eurToUsd && eurAmount) {
      setConvertedToUsd((eurAmount * eurToUsd).toFixed(2));
    }
  };

  if (loading) {
    return <div className="exchange-container">Loading...</div>;
  }

  if (error) {
    return <div className="exchange-container">Error: {error}</div>;
  }

  return (
    <div className="exchange-container">
      <div className="exchange-box">
        <h1>Exchange Rates</h1>
        <p>1 USD = {usdToEur} EUR</p>
        <p>1 EUR = {eurToUsd} USD</p>
      </div>
      <div className="conversion-form">
        <form onSubmit={handleUsdToEur}>
          <div className="form-group">
            <label htmlFor="usd-amount">USD Amount</label>
            <input
              type="number"
              id="usd-amount"
              value={usdAmount}
              onChange={(e) => setUsdAmount(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Convert to EUR
          </button>
        </form>
        {convertedToEur !== null && (
          <p>
            {usdAmount} USD = {convertedToEur} EUR
          </p>
        )}
        <form onSubmit={handleEurToUsd} className="mt-3">
          <div className="form-group">
            <label htmlFor="eur-amount">EUR Amount</label>
            <input
              type="number"
              id="eur-amount"
              value={eurAmount}
              onChange={(e) => setEurAmount(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Convert to USD
          </button>
        </form>
        {convertedToUsd !== null && (
          <p>
            {eurAmount} EUR = {convertedToUsd} USD
          </p>
        )}
      </div>
      <TransferForm />
    </div>
  );
}

export default Exchange;
