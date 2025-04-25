import { useState, useEffect } from "react";
import { useRates } from "../lib/context/RatesContext";
import { ExchangeRate } from "../lib/types";

const CheckerForm = () => {
  const { rates } = useRates();
  const [bsdAmount, setBsdAmount] = useState<string>("");
  const [usdAmount, setUsdAmount] = useState<string>("");
  const [selectedRate, setSelectedRate] = useState<ExchangeRate | null>(null);

  const filteredRates = rates.filter(
    (rate) => rate.fuente === "oficial" || rate.fuente === "paralelo"
  );

  useEffect(() => {
    const officialRate = rates.find((rate) => rate.fuente === "oficial");
    if (officialRate) {
      setSelectedRate(officialRate);
    }
  }, [rates]);

  const handleBsdChange = (value: string) => {
    setBsdAmount(value);
    if (selectedRate && value) {
      const usdValue = parseFloat(value) / selectedRate.promedio;
      setUsdAmount(usdValue.toFixed(2));
    } else {
      setUsdAmount("");
    }
  };

  const handleUsdChange = (value: string) => {
    setUsdAmount(value);
    if (selectedRate && value) {
      const bsdValue = parseFloat(value) * selectedRate.promedio;
      setBsdAmount(bsdValue.toFixed(2));
    } else {
      setBsdAmount("");
    }
  };

  const handleRateChange = (rate: ExchangeRate) => {
    setSelectedRate(rate);
    if (usdAmount) {
      const bsdValue = parseFloat(usdAmount) * rate.promedio;
      setBsdAmount(bsdValue.toFixed(2));
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-base-950">
        Convertidor de Divisas
      </h1>

      <div className="bg-base-100 border border-base-200 rounded-lg p-6 shadow-lg">
        <div className="flex gap-2 mb-4">
          {filteredRates.map((rate) => (
            <button
              key={rate.fuente}
              onClick={() => handleRateChange(rate)}
              className={`px-4 py-2 font-bold rounded-lg transition-colors border-1 border-black/10 ${
                selectedRate?.fuente === rate.fuente
                  ? "bg-accent-500  text-white"
                  : "bg-base-200 text-base-950 hover:bg-base-300"
              }`}
            >
              {rate.nombre}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="usd"
              className="block text-xl font-medium text-base-950 mb-1"
            >
              Dólares ($)
            </label>
            <input
              type="number"
              id="usd"
              value={usdAmount}
              onChange={(e) => handleUsdChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg font-bold text-base-950 bg-base-400/20 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black/20"
              placeholder="0.00"
            />
          </div>

          <div>
            <label
              htmlFor="bsd"
              className="block text-xl font-medium text-base-950 mb-1"
            >
              Bolívares (Bs)
            </label>
            <input
              type="number"
              id="bsd"
              value={bsdAmount}
              onChange={(e) => handleBsdChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg font-bold text-base-950 bg-base-400/20 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black/20"
              placeholder="0.00"
            />
          </div>
        </div>

        {selectedRate && (
          <p className="mt-4  text-base-600">
            Tasa de cambio:{" "}
            <b> 1 USD = {selectedRate.promedio.toFixed(2)} Bs</b>
          </p>
        )}
      </div>
    </>
  );
};

export default CheckerForm;
