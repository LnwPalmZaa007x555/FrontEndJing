"use client";

//http://localhost:3000/selectroom/2/202

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import creatBooking from "@/lib/creatbooking";
import { useSession } from "next-auth/react";

export default function PaymentPage({ params }) {
  const [floorNumber, setFloorNumber] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [checkInDate, setCheckInDate] = useState(""); // Check-in date state
  const [checkOutDate, setCheckOutDate] = useState(""); // Check-out date state
  const [guests, setGuests] = useState(""); // Guests state
  const [maxGuests, setMaxGuests] = useState(2);
  const { data: session, status } = useSession()

  const router = useRouter();

  const searchParams = useSearchParams(); // ใช้ useSearchParams
    const roomD = searchParams.get("roomId");

  // คำนวณวันที่ปัจจุบันในรูปแบบ yyyy-MM-dd
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      const resolvedRoomId = Number(resolvedParams.roomname);
      const resolvedFloorNum = Number(resolvedParams.floornum);
      setFloorNumber(resolvedFloorNum);
      setRoomId(resolvedRoomId);

      // Update maxGuests based on roomId
      if (resolvedFloorNum > 4) {
        setMaxGuests(3);
      } else {
        setMaxGuests(2);
      }
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (checkInDate) {
      const checkInDateObj = new Date(checkInDate);
      checkInDateObj.setFullYear(checkInDateObj.getFullYear() + 1);
      const newCheckInDate = checkInDateObj.toISOString().split("T")[0];
      setCheckOutDate(newCheckInDate);
    }
  }, [checkInDate]);

  const handleConfirm = async () => {
    try {
      if (!checkInDate || !checkOutDate || !guests) {
        alert("Please fill in all fields before confirming.");
        return;
      }
  
      const response = await creatBooking(
        {
          startDate: new Date(checkInDate),
          endDate: new Date(checkOutDate),
          numGuest: Number(guests),
        },
        roomD,
        session?.user?.token
      );
  
      alert(`Booking confirmed for Room ${roomId} on Floor ${floorNumber} (Premium Room).
  Check-in: ${checkInDate}
  Check-out: ${checkOutDate}
  Guests: ${guests}`);
      router.push("/");
    } catch (err) {
      console.log(err)
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const guestOptions = Array.from(
    { length: maxGuests },
    (_, index) => index + 1
  );

  return (
    <div className={styles.container}>
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
            min={todayDate} // ป้องกันการเลือกวันที่ในอดีต
          />

          <label className={styles.label}>Date Check Out</label>
          <input
            type="date"
            className={styles.input}
            value={checkOutDate}
            readOnly // ทำให้ฟิลด์นี้ไม่สามารถแก้ไขได้
          />

          <label className={styles.label}>Number of guests</label>
          <select
            className={styles.select}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="">Select</option>
            {guestOptions.map((guest) => (
              <option key={guest} value={guest}>
                {guest}
              </option>
            ))}
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
