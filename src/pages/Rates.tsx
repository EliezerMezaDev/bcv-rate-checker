//? LAYOUTS
import Section from "../layouts/section";

//? COMPONENTS
import RatesCard from "../components/RatesCard";

const Rates = () => {
  return (
    <Section>
      <div className="space-y-8">
        <RatesCard showTitle={true} />
      </div>
    </Section>
  );
};

export default Rates;
