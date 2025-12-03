import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import DayPage from "./DayPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/xp-advent-calendar" element={<App />} />
        <Route path="/xp-advent-calendar/:dayId" element={<DayPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
