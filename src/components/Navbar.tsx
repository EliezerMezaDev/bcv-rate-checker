import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-base-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-base-200 text-xl ">
          <b className=" text-amber-500">BCV</b> Rate Checker
        </Link>

        <div className="space-x-4">
          <Link
            to="/"
            className="text-base-200 hover:text-accent-500 transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/tasas"
            className="text-base-200 hover:text-accent-500 transition-colors"
          >
            Tasas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
