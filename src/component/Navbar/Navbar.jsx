"use client"
import styles from './page.module.css';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"; // นำเข้า signOut
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === "authenticated") {
      console.log('User is logged in:', session);
    } else {
      console.log('User is not logged in');
    }
  }, [session, status]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };
    
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <a className={styles.link} href="/">Home</a>
        <a className={styles.link} href="/mybooking">My Booking</a>
        <a className={styles.link} href="/contact">Contact</a>
      </div>
      <div className={styles.navButtons}>
        {!session ? (
          <>
            <Link href="/auth/login">
              <button className={styles.signin}>Sign in</button>
            </Link>
            <Link href="/auth/register">
              <button className={styles.register}>Register</button>
            </Link>
          </>
        ) : (
          <div className={styles.navButtons}>
        {/* Sign Out Button */}
        <Link href="/">
          <button className={styles.signout} 
           onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
        </Link>

        {(session?.user?.pl?.role === 'STAFF' || session?.user?.pl?.role === 'ADMIN') &&(
        <Link href="/Staff">
        <button className={styles.signin}>Manage</button>
      </Link>
      )}

        {/* Profile Section */}
        <div className={styles.profileIcon} onClick={toggleDropdown}>
          <img
            src="/Pictures/profile.jpg" /* ใส่รูปโปรไฟล์ */
            alt="Profile"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
          <div
            className={`${styles.profileDropdown} ${
              dropdownVisible ? styles.visible : ''
            }`}
          >
            <div className={styles.profileItem}>
              <strong>Email:</strong> {session?.user?.pl?.email}
            </div>
            <div className={styles.profileItem}>
              <strong>Phone:</strong> {session?.user?.pl?.phone}
            </div>
            <div className={styles.profileItem}>
              <strong>Role:</strong> {session?.user?.pl?.role}
            </div>
          </div>
        </div>
      </div>
      )}
      
      </div>
    </nav>
  );
}

      
