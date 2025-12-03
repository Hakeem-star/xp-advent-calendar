import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter, Route, Routes } from "react-router";
import DayPage from "./DayPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter basename="/xp-advent-calendar">
      <Routes>
        <Route path="/xp-advent-calendar" element={<App />} />
        <Route path="/xp-advent-calendar/:dayId" element={<DayPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
