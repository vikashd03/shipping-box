import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ShippingProvider } from "./Context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ShippingProvider>
        <App />
      </ShippingProvider>
    </BrowserRouter>
  </StrictMode>,
);
