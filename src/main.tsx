// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home.tsx";
import { Pokemon } from "./pages/pokemon/Pokemon.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="pokemon/:id" element={<Pokemon />} />
    </Routes>
  </BrowserRouter>,
  // </StrictMode>,
);
