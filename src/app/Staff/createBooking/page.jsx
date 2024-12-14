"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateBooking() {
  const [formData, setFormData] = useState({
    customerName: "",
    roomNumber: "",
    checkIn: "",
    checkOut: "",
  });

 const router = useRouter();

  const { data: session, status } = useSession();
      if(session?.user?.pl?.role != 'STAFF'){
        router.push("/")
        return
      }

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation (Optional)
    if (!formData.customerName || !formData.roomNumber || !formData.checkIn || !formData.checkOut) {
      alert("Please fill in all required fields.");
      return;
    }

    // Mock API Call (Optional)
    console.log("Booking Created:", formData);

    // Reset Form
    setFormData({
      customerName: "",
      roomNumber: "",
      checkIn: "",
      checkOut: "",
    });

    setSuccessMessage("Booking created successfully!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Booking</h1>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="customerName" className={styles.label}>Customer Name</label> {/* แก้เป็น customerId ไอสัส */}
          <input
            type="text"
            id="customerName"
            name="customerName"
            className={styles.input}
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="roomNumber" className={styles.label}>Room Number</label>
          <input
            type="number"
            id="roomNumber"
            name="roomNumber"
            className={styles.input}
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkIn" className={styles.label}>Check-in Date</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            className={styles.input}
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkOut" className={styles.label}>Check-out Date</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            className={styles.input}
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Create Booking</button>
      </form>
    </div>
  );
}
