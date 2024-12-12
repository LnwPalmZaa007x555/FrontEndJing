"use client"
import styles from './page.module.css';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"; // นำเข้า signOut
import { useEffect } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "authenticated") {
      console.log('User is logged in:', session);
    } else {
      console.log('User is not logged in');
    }
  }, [session, status]);


  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <a className={styles.link} href="/">Home</a>
        <a className={styles.link} href="/Auth/Login">My Booking</a>
        <a className={styles.link} href="/Contact/BeforeLogin">Contact</a>
      </div>
      <div className={styles.navButtons}>
        {!session ? (
          <>
            <Link href="/Auth/Login">
              <button className={styles.signin}>Sign in</button>
            </Link>
            <Link href="/Auth/Register">
              <button className={styles.register}>Register</button>
            </Link>
          </>
        ) : (
          <>
            <button
              className={styles.logout}
              onClick={() => signOut({ callbackUrl: '/' })} // ใช้ signOut เพื่อออกจากระบบ
            >
              Log out
            </button>
          </>
        )}
        {session?.user?.pl?.role == 'STAFF' && (
          <Link href="/Auth/Login">
          <button className={styles.signin}>Staff</button>
        </Link>
        )}
      </div>
    </nav>
  );
}

