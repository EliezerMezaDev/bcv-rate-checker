import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          BCV Rate Checker
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">
            Inicio
          </Link>
          <Link to="/tasas" className="text-white hover:text-blue-200">
            Tasas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
