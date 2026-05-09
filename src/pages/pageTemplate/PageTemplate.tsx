import React from "react";
import { Header } from "../../components/header/Header.tsx";
import { Container } from "../../components/container/Container.tsx";
import styles from "./pageTemplate.module.css";

export const PageTemplate = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.page}>
    <Header />
    <main className={styles.main}>
      <Container>{children}</Container>
    </main>
  </div>
);
