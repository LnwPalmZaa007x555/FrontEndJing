"use client";

import styles from './page.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <a className={styles.link} href="/Home/AfterLogin">Staff</a>
      </div>
      <div className={styles.navButtons}>
        {/* Sign Out Button */}
        <Link href="/">
          <button className={styles.signout}>Sign Out</button>
        </Link>

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
              <strong>Email:</strong> nig.ga@example.com
            </div>
            <div className={styles.profileItem}>
              <strong>Phone:</strong> 0123456789
            </div>
            <div className={styles.profileItem}>
              <strong>Role:</strong> staff
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
