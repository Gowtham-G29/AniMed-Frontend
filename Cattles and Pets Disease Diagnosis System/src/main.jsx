import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { registerServiceWorker } from "./serviceWorker";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <App />
  
  </StrictMode>
);

registerServiceWorker(); // ✅ Register service worker

