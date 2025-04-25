import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-base-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-base-200 text-xl font-bold">
          BCV Rate Checker
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-base-200 hover:text-accent transition-colors">
            Inicio
          </Link>
          <Link to="/tasas" className="text-base-200 hover:text-accent transition-colors">
            Tasas
          </Link>
          <Link to="/historial" className="text-base-200 hover:text-accent transition-colors">
            Historial
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
