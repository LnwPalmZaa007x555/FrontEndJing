"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Navbar from "../../../../../../../../Navbar/After/page";
import styles from "./page.module.css";

export default function PaymentPage({ params }) {
  const [floorNumber, setFloorNumber] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [checkInDate, setCheckInDate] = useState(""); // Check-in date state
  const [checkOutDate, setCheckOutDate] = useState(""); // Check-out date state
  const [guests, setGuests] = useState(""); // Guests state

  const router = useRouter(); // Initialize router

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setFloorNumber(resolvedParams.floorNumber);
      setRoomId(resolvedParams.roomId);
    }
    fetchParams();
  }, [params]);

  if (!floorNumber || !roomId) {
    return <div>Loading...</div>;
  }

  const handleConfirm = () => {
    if (!checkInDate || !checkOutDate || !guests) {
      alert("Please fill in all fields before confirming.");
      return;
    }
    alert(`Booking confirmed for Room ${roomId} on Floor ${floorNumber} (Premium Room).
Check-in: ${checkInDate}
Check-out: ${checkOutDate}
Guests: ${guests}`);
    router.push("/Home/AfterLogin"); // Navigate to the main page
  };

  const handleCancel = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <h1 className={styles.title}>KimStar5</h1>
      <div className={styles.paymentBox}>
        <h2 className={styles.roomInfo}>
          {floorNumber} Floor Room {roomId} (Premium Room)
        </h2>
        <p className={styles.subTitle}>Confirm your booking</p>
        <form className={styles.form}>
          <label className={styles.label}>Date Check In</label>
          <input
            type="date"
            className={styles.input}
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />

          <label className={styles.label}>Date Check Out</label>
          <input
            type="date"
            className={styles.input}
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />

          <label className={styles.label}>Number of guests</label>
          <select
            className={styles.select}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="">Value</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <div className={styles.price}>4,500 BAHT</div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
