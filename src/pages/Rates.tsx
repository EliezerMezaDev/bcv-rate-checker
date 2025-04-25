import { useEffect, useState } from 'react';
import { getExchangeRates } from '../api/exchangeRates';
import { ExchangeRate } from '../lib/types';

const Rates = () => {
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
        setError('Error al cargar las tasas de cambio');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tasas de Cambio</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rates.map((rate) => (
          <div key={rate.fuente} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{rate.nombre}</h2>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${rate.promedio.toFixed(2)}
            </div>
            <p className="text-sm text-gray-500">
              Actualizado: {new Date(rate.fechaActualizacion).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rates; 