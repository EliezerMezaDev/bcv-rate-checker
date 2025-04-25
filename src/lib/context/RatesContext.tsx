import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ExchangeRate } from "../types";
import { getExchangeRates } from "../../api/exchangeRates";

interface RatesContextType {
  rates: ExchangeRate[];
  loading: boolean;
  error: string | null;
}

const RatesContext = createContext<RatesContextType | undefined>(undefined);

export const useRates = () => {
  const context = useContext(RatesContext);
  
  if (context === undefined) {
    throw new Error("useRates debe ser usado dentro de un RatesProvider");
  }
  return context;
};

interface RatesProviderProps {
  children: ReactNode;
}

export const RatesProvider = ({ children }: RatesProviderProps) => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getExchangeRates();
        setRates(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar las tasas de cambio");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <RatesContext.Provider value={{ rates, loading, error }}>
      {children}
    </RatesContext.Provider>
  );
};
