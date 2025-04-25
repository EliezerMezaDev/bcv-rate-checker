import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//? PAGES
import Home from "./pages/Home";
import Rates from "./pages/Rates";
import History from "./pages/History";

//? COMPONENTS
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasas" element={<Rates />} />
            <Route path="/historial" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
