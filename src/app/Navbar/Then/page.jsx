import styles from './page.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a className={styles.link} href="/">Home</a>
    </nav>
  );
}
