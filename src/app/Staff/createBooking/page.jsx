"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import creatUserBooking from "@/lib/createuserbooking";

export default function CreateBookingPage() {
  const [customerId, setCustomerId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [maxGuests, setMaxGuests] = useState(3);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  
  useEffect(() => {
    if (session?.user?.pl?.role !== 'STAFF' && session?.user?.pl?.role !== 'ADMIN') {
      router.push("/");
    }
  }, [session, router]);

 
  useEffect(() => {
    const roomParam = searchParams.get("roomName");
    if (roomParam) {
      setRoomName(roomParam);
      const floorNumber = Math.floor(Number(roomParam) / 100);
      setMaxGuests(floorNumber > 4 ? 3 : 2); 
    }
  }, [searchParams]);

 
  useEffect(() => {
    if (checkInDate) {
      const checkIn = new Date(checkInDate);
      checkIn.setFullYear(checkIn.getFullYear() + 1); 
      setCheckOutDate(checkIn.toISOString().split("T")[0]);
    }
  }, [checkInDate]);

 
  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!customerId || !roomName || !checkInDate || !checkOutDate || !guests) {
      alert("Please fill in all fields.");
      return;
    }

    const bookingData = {
      customerId: Number(customerId),
      roomName: roomName.trim(), // Trim whitespace
      startDate: checkInDate,
      endDate: checkOutDate,
      numGuest: guests,
    };

    console.log("roomName:", bookingData.roomName);

    try {
      const response = await creatUserBooking(bookingData, session?.user?.token, bookingData.roomName);  // ส่ง token และ bookingData ไปยัง API
      if (response.success) {
        alert("Booking created successfully!");
        router.push("/");
      } else {
        alert("Booking failed: " + response.message);
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Booking</h1>
      <form className={styles.form} onSubmit={handleConfirm}>
        {/* Customer ID */}
        <div className={styles.formGroup}>
          <label htmlFor="customerId" className={styles.label}>
            UserID
          </label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            className={styles.input}
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>

        {/* Room Name */}
        <div className={styles.formGroup}>
          <label htmlFor="roomName" className={styles.label}>
            Room Name
          </label>
          <input
            type="text"
            id="roomName"
            name="roomName"
            className={styles.input}
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>

        {/* Check-in Date */}
        <div className={styles.formGroup}>
          <label htmlFor="checkIn" className={styles.label}>
            Check-in Date
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            className={styles.input}
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        {/* Check-out Date */}
        <div className={styles.formGroup}>
          <label htmlFor="checkOut" className={styles.label}>
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            className={styles.input}
            value={checkOutDate}
            readOnly
            required
          />
        </div>

        {/* Number of Guests */}
        <div className={styles.formGroup}>
          <label htmlFor="guests" className={styles.label}>
            Number of Guests
          </label>
          <select
            id="guests"
            name="guests"
            className={styles.select}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Booking
        </button>
      </form>
    </div>
  );
}
