import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//? PAGES
import Home from "./pages/Home";
import Rates from "./pages/Rates";

//? COMPONENTS
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

//? CONTEXT
import { RatesProvider } from "./lib/context/RatesContext";

function App() {
  return (
    <RatesProvider>
      <Router>
        <div className="min-h-screen bg-base-200 text-base-950">
          <Navbar />
          <main className="py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasas" element={<Rates />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </RatesProvider>
  );
}

export default App;
