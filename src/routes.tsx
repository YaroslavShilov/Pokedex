import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home.tsx";
import { Pokemon } from "./pages/pokemon/Pokemon.tsx";
import { NotFoundPage } from "./pages/notFoundPage/NotFoundPage.tsx";
import { Layout } from "./pages/layout/Layout.tsx";
import { Favorites } from "./pages/favorites/Favorites.tsx";

export const routes = (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="pokemon/:id" element={<Pokemon />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
