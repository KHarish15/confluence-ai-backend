import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import "./App.css";

// Find the extension root first.
// If it doesn't exist (normal Vite development),
// fall back to the default Vite root.
const rootElement =
    document.getElementById("confluence-ai-root") ||
    document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);