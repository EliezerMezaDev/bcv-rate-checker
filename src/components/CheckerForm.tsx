import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useRates } from "../lib/context/RatesContext";
import { ExchangeRate } from "../lib/types";

interface RateSelectorProps {
  filteredRates: ExchangeRate[];
  selectedRate: ExchangeRate | null;
  onRateChange: (rate: ExchangeRate) => void;
}

const RateSelector = memo(({ filteredRates, selectedRate, onRateChange }: RateSelectorProps) => (
  <div className="flex gap-2 mb-4">
    {filteredRates.map((rate) => (
      <button
        key={rate.fuente}
        onClick={() => onRateChange(rate)}
        className={`px-4 py-2 font-bold rounded-lg transition-colors border-1 border-black/10 ${
          selectedRate?.fuente === rate.fuente
            ? "bg-accent-500"
            : "bg-base-200 hover:bg-base-300"
        }`}
      >
        {rate.nombre}
      </button>
    ))}
  </div>
));

interface CoreFormProps {
  usdAmount: string;
  bsdAmount: string;
  showComparison: boolean;
  onUsdChange: (value: string) => void;
  onBsdChange: (value: string) => void;
}

const CoreForm = memo(({ usdAmount, bsdAmount, showComparison, onUsdChange, onBsdChange }: CoreFormProps) => (
  <>
    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          onChange={(e) => onUsdChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg font-bold text-base-950 bg-base-400/20 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black/20"
          placeholder="0.00"
        />
      </div>

      {!showComparison && (
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
            onChange={(e) => onBsdChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg font-bold text-base-950 bg-base-400/20 border border-black/20 focus:outline-none focus:ring-1 focus:ring-black/20"
            placeholder="0.00"
          />
        </div>
      )}
    </div>
  </>
));

interface CurrentRateRazonProps {
  selectedRate: ExchangeRate | null;
}

const CurrentRateRazon = memo(({ selectedRate }: CurrentRateRazonProps) => (
  <span className="mt-4 text-base-950 flex flex-wrap gap-1">
    <p>Tasa de cambio:</p>
    <p>
      <b className="py-1 px-3 rounded-2xl bg-accent-500 text-white">
        1 USD = {selectedRate?.promedio.toFixed(2)} Bs
      </b>
    </p>
  </span>
));

interface ToggleConvertedAmountListProps {
  showComparison: boolean;
  onToggle: (checked: boolean) => void;
}

const ToggleConvertedAmountList = memo(({ showComparison, onToggle }: ToggleConvertedAmountListProps) => (
  <div className="my-4">
    <label className="flex items-center gap-4 md:gap-1 cursor-pointer">
      <input
        type="checkbox"
        checked={showComparison}
        onChange={(e) => onToggle(e.target.checked)}
        className="w-6 h-6 md:w-4 md:h-4 rounded-xl bg-base-100 border-base-300 accent-accent-500"
      />
      <span className="text-base-950 font-medium">
        Comparación de tasas de cambio
      </span>
    </label>
  </div>
));

interface BsConvertedAmountListProps {
  usdAmount: string;
  officialRate: ExchangeRate | undefined;
  parallelRate: ExchangeRate | undefined;
  averageRate: number | null;
}

const BsConvertedAmountList = memo(({ usdAmount, officialRate, parallelRate, averageRate }: BsConvertedAmountListProps) => (
  <div className="space-y-2 mt-4">
    <div className="p-4 rounded-lg bg-base-200 text-base-950 text-md">
      <p>
        Tasa BCV:{" "}
        <span className="text-lg font-bold text-base-600">
          {officialRate &&
            (parseFloat(usdAmount) * officialRate.promedio).toFixed(2)}{" "}
          Bs
        </span>
      </p>
      <p>
        Tasa Paralela:{" "}
        <span className="text-lg font-bold text-base-600">
          {parallelRate &&
            (parseFloat(usdAmount) * parallelRate.promedio).toFixed(2)}{" "}
          Bs
        </span>
        {officialRate && parallelRate && (
          <span className="ml-2 py-1 px-3 rounded-2xl bg-accent-500 text-sm font-bold text-white">
            +
            {(
              (parallelRate.promedio / officialRate.promedio - 1) *
              100
            ).toFixed(2)}
            %
          </span>
        )}
      </p>
      <p>
        Tasa Promedio:{" "}
        <span className="text-lg font-bold text-base-600">
          {averageRate && (parseFloat(usdAmount) * averageRate).toFixed(2)}{" "}
          Bs
        </span>
        {officialRate && averageRate && (
          <span className="ml-2 py-1 px-3 rounded-2xl bg-accent-500 text-sm font-bold text-white">
            +{((averageRate / officialRate.promedio - 1) * 100).toFixed(2)}%
          </span>
        )}
      </p>
    </div>
  </div>
));

const CheckerForm = () => {
  const { rates } = useRates();
  const [bsdAmount, setBsdAmount] = useState<string>("");
  const [usdAmount, setUsdAmount] = useState<string>("");
  const [selectedRate, setSelectedRate] = useState<ExchangeRate | null>(null);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const filteredRates = useMemo(() => 
    rates.filter((rate) => rate.fuente === "oficial" || rate.fuente === "paralelo"),
    [rates]
  );

  const officialRate = useMemo(() => 
    rates.find((rate) => rate.fuente === "oficial"),
    [rates]
  );

  const parallelRate = useMemo(() => 
    rates.find((rate) => rate.fuente === "paralelo"),
    [rates]
  );

  const averageRate = useMemo(() => 
    officialRate && parallelRate
      ? (officialRate.promedio + parallelRate.promedio) / 2
      : null,
    [officialRate, parallelRate]
  );

  useEffect(() => {
    if (officialRate) {
      setSelectedRate(officialRate);
    }
  }, [officialRate]);

  const handleBsdChange = useCallback((value: string) => {
    if (!value) {
      setBsdAmount("");
      setUsdAmount("");
      return;
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return;

    setBsdAmount(value);
    if (selectedRate) {
      const usdValue = numericValue / selectedRate.promedio;
      setUsdAmount(usdValue.toFixed(2));
    }
  }, [selectedRate]);

  const handleUsdChange = useCallback((value: string) => {
    if (!value) {
      setUsdAmount("");
      setBsdAmount("");
      return;
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return;

    setUsdAmount(value);
    if (selectedRate) {
      const bsdValue = numericValue * selectedRate.promedio;
      setBsdAmount(bsdValue.toFixed(2));
    }
  }, [selectedRate]);

  const handleRateChange = useCallback((rate: ExchangeRate) => {
    setSelectedRate(rate);

    if (usdAmount) {
      const bsdValue = parseFloat(usdAmount) * rate.promedio;
      setBsdAmount(bsdValue.toFixed(2));
    }
  }, [usdAmount]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-base-950">
        Convertidor de Divisas
      </h1>

      <div className="bg-base-100 border border-base-200 rounded-lg p-6 shadow-lg">
        {!showComparison && (
          <RateSelector
            filteredRates={filteredRates}
            selectedRate={selectedRate}
            onRateChange={handleRateChange}
          />
        )}

        <CoreForm
          usdAmount={usdAmount}
          bsdAmount={bsdAmount}
          showComparison={showComparison}
          onUsdChange={handleUsdChange}
          onBsdChange={handleBsdChange}
        />

        {showComparison && usdAmount && (
          <BsConvertedAmountList
            usdAmount={usdAmount}
            officialRate={officialRate}
            parallelRate={parallelRate}
            averageRate={averageRate}
          />
        )}

        {selectedRate && !showComparison && (
          <CurrentRateRazon selectedRate={selectedRate} />
        )}

        <ToggleConvertedAmountList
          showComparison={showComparison}
          onToggle={setShowComparison}
        />
      </div>
    </>
  );
};

export default CheckerForm;
