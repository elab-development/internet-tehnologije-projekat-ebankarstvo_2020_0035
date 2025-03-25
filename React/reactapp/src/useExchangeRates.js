import { useState, useEffect } from "react";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

const freecurrencyapi = new Freecurrencyapi(
  "fca_live_P99y60SZB3XKJZjJyOBkxC0KUeeTimailk1LcaDY"
);

//DEFINISEMO CUSTOM HOOK KOJI MOZEMO NA DALJE DA KORISTIMO U EXCHANGE.JSX

const useExchangeRates = () => {
  const [usdToEur, setUsdToEur] = useState(null);
  const [eurToUsd, setEurToUsd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      freecurrencyapi.latest({
        //request
        base_currency: "USD",
        currencies: "EUR",
      }),
      freecurrencyapi.latest({
        //request
        base_currency: "EUR",
        currencies: "USD",
      }),
    ]) //ako nije pukao jedan od njih
      .then(([usdToEurResponse, eurToUsdResponse]) => {
        setUsdToEur(usdToEurResponse.data.EUR);
        setEurToUsd(eurToUsdResponse.data.USD);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { usdToEur, eurToUsd, loading, error };
};

export default useExchangeRates;
