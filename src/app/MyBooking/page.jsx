"use client";

import Navbar from "../Navbar/After/page";
import styles from "./page.module.css";

export default function MyBooking() {
  const bookings = [
    {
      id: 1,
      title: "KimStar5 2nd Floor Room 208",
      price: "3,500 BATH",
      status: "Booked",
      checkIn: "01/01/2024",
      checkOut: "03/01/2024",
      guests: "2",
    },
    {
      id: 2,
      title: "KimStar5 5th Floor Room 504",
      price: "4,500 BATH",
      status: "Canceled",
      checkIn: "N/A",
      checkOut: "N/A",
      guests: "N/A",
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <h1 className={styles.title}>My Bookings</h1>
      <div className={styles.bookingsList}>
        {bookings.map((booking) => (
          <div key={booking.id} className={styles.bookingCard}>
            <div className={styles.bookingDetails}>
              <h2 className={styles.bookingTitle}>{booking.title}</h2>
              <div className={`${styles.bookingStatus} ${booking.status === "Booked" ? styles.booked : styles.canceled}`}>
                {booking.status}
              </div>
              <div className={styles.bookingPrice}>{booking.price}</div>
              <p>Check in: {booking.checkIn}</p>
              <p>Check out: {booking.checkOut}</p>
              <p>No. of guests: {booking.guests}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
