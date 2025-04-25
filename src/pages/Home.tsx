//? LAYOUTS
import Section from "../layouts/section";

//? COMPONENTS
import RatesCard from "../components/RatesCard";

const Home = () => {
  return (
    <Section>
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Bienvenido a BCV Rate Checker
        </h1>
        <p className="text-gray-600">
          Consulta las tasas de cambio del Banco Central de Venezuela, calcula
          montos en dolares, y comprueba la diferencia cambiaria en tiempo real.
        </p>
      </div>

      <hr className="my-4 h-0.25 border-t-0 bg-gray-300" />

      <div>
        <RatesCard />
      </div>
    </Section>
  );
};

export default Home;
