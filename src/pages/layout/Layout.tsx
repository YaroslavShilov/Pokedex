import { Header } from "../../components/header/Header.tsx";
import { Container } from "../../components/container/Container.tsx";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";

export const Layout = () => (
  <div className={styles.root}>
    <Header />
    <main className={styles.main}>
      <Container>
        <Outlet />
      </Container>
    </main>
  </div>
);
