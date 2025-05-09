import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter className="font-inter h-screen bg-gray-100">
      <App />
    </BrowserRouter>
  </StrictMode>
);
