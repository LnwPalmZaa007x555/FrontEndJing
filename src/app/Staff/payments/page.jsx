"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getMyBooking, userUpdateRooms } from "@/lib/mybooking";
import { decreasePayment, increasePayment } from "@/lib/paymentinfo";

export default function Payments() {
  // Mock Data สำหรับ Payment
  const router = useRouter();  
  const [payments, setPayments] = useState([])
  const { data: session, status } = useSession();
      if(session?.user?.pl?.role !== 'STAFF' && session?.user?.pl?.role !== 'ADMIN'){
        router.push("/")
        return
      }
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('th-TH', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(date);
      };

  useEffect(() => {
            const fetchBooking = async () => {
              try {
                const response = await getMyBooking(session?.user?.token)
                if (response.success) {
                  console.log("testJing")
                  const paymentData = response.data;
                  // การจัดกลุ่มห้องในแต่ละชั้น
                  const rePayment = []
                  paymentData.forEach((booking) =>{
                    if(booking?.bookingStatus==0)
                      {const data = {
                      id: Number(booking.bookingId),
                      customer : booking?.customer?.user?.fname+" "+booking?.customer?.user?.lname,
                      roomNumber : (Number(booking?.room?.roomName) /100) <=4? "Normal": "Premium",
                      roomType: booking?.room?.roomName ,
                      checkIn : formatDate(booking?.startDate),
                      checkOut: formatDate(booking?.endDate),
                      monthlyAmount: booking?.payment?.paypermonth,
                      paidMonths: booking?.payment?.installments,
                      amount: booking?.payment?.amount,
                      paymentId: Number(booking?.payment?.paymentId),
                      roomId: Number(booking?.room?.roomId),
                      customerId: Number(booking?.customer?.customerId)
                    };
                    console.log('data')
                    console.log(data)
                    rePayment.push(data)}
                  })
                  
                  console.log(rePayment)
                  setPayments(rePayment)
                }
              } catch (error) {
                console.error("Error fetching rooms:", error);
              }
            };
        
            fetchBooking();
          }, []);

          useEffect(()=>{
            console.log("test4")
            console.log(payments)
          },[payments])
  

  // ฟังก์ชันเพิ่มจำนวนงวดที่ชำระ
  const increasePaidMonths = async (id, roomId) => {
    try {
      console.log("test token");
      console.log(session?.user?.token);
  
      // เรียกใช้ API เพื่อเพิ่มจำนวนงวดที่ชำระ
      const incPay = await increasePayment(session?.user?.token, id);
      if (incPay.success) {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.paymentId === id && payment.paidMonths < 12
              ? { ...payment, paidMonths: payment.paidMonths + 1 }
              : payment
          )
        );
  
        // อัปเดตสถานะของห้อง (roomId)
        const updateRoomResponse = await userUpdateRooms(session?.user?.token, roomId, 1);
        if (!updateRoomResponse.success) {
          throw new Error("Failed to update room status");
        }
      }
    } catch (err) {
      console.error("Error in increasePaidMonths:", err);
    }
  };

  // ฟังก์ชันลดจำนวนงวดที่ชำระ
  const decreasePaidMonths = async (id,roomId) => {
    try {
      console.log("test token")
      console.log(session?.user?.token)
      const decPay = await decreasePayment(session?.user?.token, id)
      if(decPay.success){
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.paymentId=== id && payment.paidMonths > 0
              ? { ...payment, paidMonths: payment.paidMonths - 1 }
              : payment
          )
        );
      const updateRoomResponse = await userUpdateRooms(session?.user?.token,roomId, 0);
        if (!updateRoomResponse.success) {
           throw new Error("Failed to update room status");
         }
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Information</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Customer ID</th>
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
            console.log("test5")
            console.log(remainingMonths)
            console.log(totalAmount)

            return (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.customer}</td>
                <td>{payment.customerId}</td>
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
                    onClick={() => increasePaidMonths(payment.paymentId,payment.roomId)}
                    disabled={payment.paidMonths === 12}
                  >
                    +
                  </button>
                  <button
                    className={`${styles.button} ${styles["button-red"]}`}
                    onClick={() => decreasePaidMonths(payment.paymentId,payment.roomId)}
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
