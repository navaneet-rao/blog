//
// main.tsx
// This file contains the main entry point for the application.
// It renders the App component inside the root element.
// It wraps the App component in the StrictMode component.
// It also imports the main.css file for global styles.
//


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
