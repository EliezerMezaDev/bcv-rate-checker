import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

const Section = ({
  children,
  className = "",
  containerClassName = "container mx-auto",
}: SectionProps) => {
  return (
    <section className={`px-4 ${className}`}>
      <div className={containerClassName}>{children}</div>
    </section>
  );
};

export default Section;
