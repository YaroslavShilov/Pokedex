// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { routes } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <HashRouter>{routes}</HashRouter>,
  // </StrictMode>,
);
