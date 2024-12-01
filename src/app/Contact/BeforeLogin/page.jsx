"use client";

import Navbar from "../../Navbar/Before/page"; // อ้างอิง Navbar
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Contact Us</h1>

        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <h3 className={styles.contactTitle}>Address</h3>
            <p>123 KimStar5 Road, City Name, 12345</p>
          </div>
          <div className={styles.contactItem}>
            <h3 className={styles.contactTitle}>Phone</h3>
            <p>+66 123 456 789</p>
          </div>
          <div className={styles.contactItem}>
            <h3 className={styles.contactTitle}>Email</h3>
            <p>support@kimstar5.com</p>
          </div>
        </div>
      </main>
    </div>
  );
}
