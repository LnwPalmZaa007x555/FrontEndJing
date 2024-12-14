"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Payments() {
  // Mock Data สำหรับ Payment
  const { data: session, status } = useSession();
      if(session?.user?.pl?.role != 'STAFF'){
        router.push("/")
        return
      }

  const router = useRouter();  

  const [payments, setPayments] = useState([
    {
      id: "P001",
      customer: "อติชาติ",
      roomNumber: 508,
      roomType: "Normal",
      checkIn: "2024-02-01",
      checkOut: "2024-02-05",
      monthlyAmount: 3500,
      paidMonths: 1,
    },
    {
      id: "P002",
      customer: "อิสราพงศ์",
      roomNumber: 501,
      roomType: "Premium",
      checkIn: "2024-02-01",
      checkOut: "2024-02-05",
      monthlyAmount: 4500,
      paidMonths: 4,
    },
    {
      id: "P003",
      customer: "พัสกร",
      roomNumber: 505,
      roomType: "Premium",
      checkIn: "2024-02-01",
      checkOut: "2024-02-05",
      monthlyAmount: 4500,
      paidMonths: 0,
    },
  ]);

  // ฟังก์ชันเพิ่มจำนวนงวดที่ชำระ
  const increasePaidMonths = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id && payment.paidMonths < 12
          ? { ...payment, paidMonths: payment.paidMonths + 1 }
          : payment
      )
    );
  };

  // ฟังก์ชันลดจำนวนงวดที่ชำระ
  const decreasePaidMonths = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id && payment.paidMonths > 0
          ? { ...payment, paidMonths: payment.paidMonths - 1 }
          : payment
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Information</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Monthly Amount</th>
            <th>Paid Months</th>
            <th>Remaining Months</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => {
            const remainingMonths = 12 - payment.paidMonths; // คำนวณจำนวนเดือนที่เหลือ
            const totalAmount = payment.monthlyAmount * 12; // คำนวณยอดรวมทั้งปี

            return (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.customer}</td>
                <td>{payment.roomNumber}</td>
                <td>{payment.roomType}</td>
                <td>{payment.checkIn}</td>
                <td>{payment.checkOut}</td>
                <td>{payment.monthlyAmount} THB</td>
                <td>{payment.paidMonths}</td>
                <td>{remainingMonths}</td>
                <td>{totalAmount} THB</td>
                <td>
                  <button
                    className={`${styles.button} ${styles["button-green"]}`}
                    onClick={() => increasePaidMonths(payment.id)}
                    disabled={payment.paidMonths === 12}
                  >
                    +
                  </button>
                  <button
                    className={`${styles.button} ${styles["button-red"]}`}
                    onClick={() => decreasePaidMonths(payment.id)}
                    disabled={payment.paidMonths === 0}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
