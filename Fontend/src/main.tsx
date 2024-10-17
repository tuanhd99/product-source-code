import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppProvide from "./contexts/AppContext.tsx";
// import AppProvide from "routers/useRoute.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvide>
        <App />
      </AppProvide>
    </BrowserRouter>
  </React.StrictMode>
);
