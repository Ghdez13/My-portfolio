import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Fallback } from "./components/Fallback";
import "./index.css";
import "./core/i18n.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<Fallback />}>
        <App />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
