import { useRates } from "../lib/context/RatesContext";

interface RatesCardProps {
  showTitle?: boolean;
}

const RatesCard = ({ showTitle = true }: RatesCardProps) => {
  const { rates, loading, error } = useRates();

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
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
    <>
      {showTitle && (
        <h1 className="text-3xl font-bold mb-4 text-base-950">
          Tasas de Cambio
        </h1>
      )}
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rates.map((rate) => (
          <div
            key={rate.fuente}
            className="bg-base-100 border-1 border-base-200 shadow-lg rounded-lg p-4 text-base-950"
          >
            <h2 className="text-xl font-semibold ">{rate.nombre}</h2>

            <div className="text-3xl text-base-600 font-bold mb-2">
              {`${rate.promedio.toFixed(2)} Bs`}
            </div>

            <p className="mt-4 text-end text-sm">
              Actualizado:
              <b> {new Date(rate.fechaActualizacion).toLocaleString()}</b>
            </p>
          </div>
        ))}
      </article>
    </>
  );
};

export default RatesCard;
