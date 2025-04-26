import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//? styles
import "./styles/index.css";

//? components
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
