import "./App.css";
import { Home } from "./pages/home/Home.tsx";
import { Fragment } from "react";
import { PageTemplate } from "./pages/pageTemplate/PageTemplate.tsx";

function App() {
  return (
    <Fragment>
      <PageTemplate>
        <Home />
      </PageTemplate>
    </Fragment>
  );
}

export default App;
