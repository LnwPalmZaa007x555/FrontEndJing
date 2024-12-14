"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if(session?.user?.pl?.role != 'STAFF'){
    router.push("/")
    return
  }

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    // Mock logout function
    alert("You have been logged out.");
    router.push("/"); // Redirect to login page
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Staff Dashboard</h1>
      </div>
      <div className={styles.grid}>
        <div
          className={styles.card}
          onClick={() => handleNavigation("/Staff/profile")}
        >
          <h2>View My Profile</h2>
          <p>Check and update your personal information</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigation("/Staff/users")}
        >
          <h2>View All Users</h2>
          <p>Access and manage all user information</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigation("/Staff/rooms")}
        >
          <h2>View Rooms</h2>
          <p>Check information for all rooms</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigation("/Staff/payments")}
        >
          <h2>View Payments</h2>
          <p>Access all payment records</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigation("/Staff/bookings")}
        >
          <h2>View Bookings</h2>
          <p>Check all booking information</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigation("/Staff/createBooking")}
        >
          <h2>Create Booking</h2>
          <p>Make a booking on behalf of a user</p>
        </div>
      </div>
    </div>
  );
}
