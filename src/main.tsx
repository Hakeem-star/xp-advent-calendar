import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter, Route, Routes } from "react-router";
import DayPage from "./DayPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:dayId" element={<DayPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
