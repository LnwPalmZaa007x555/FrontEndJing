import styles from './page.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <a className={styles.link} href="/">Home</a>
        <a className={styles.link} href="/Auth/Login">My Booking</a>
        <a className={styles.link} href="/Contact/BeforeLogin">Contact</a>
      </div>
      <div className={styles.navButtons}>
        <Link href="/Auth/Login">
          <button className={styles.signin}>Sign in</button>
        </Link>
        <Link href="/Auth/Register">
          <button className={styles.register}>Register</button>
        </Link>
      </div>
    </nav>
  );
}
