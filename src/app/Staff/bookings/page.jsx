"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getMyBooking } from "@/lib/mybooking";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Bookings() {
  // Mock Data สำหรับการจอง
  
  const router = useRouter();

  const [ booking,setBooking ] = useState([])
    const { data: session, status } = useSession();
    if(session?.user?.pl?.role != 'STAFF'){
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
                const bookingData = response.data;
                console.log(bookingData)
                // การจัดกลุ่มห้องในแต่ละชั้น
                const reBooking = []
                bookingData.forEach((booking) =>{
                  console.log(booking?.fname+" "+booking?.lname)
                  const data = {
                    id: Number(booking.bookingId),
                    customer : booking?.customer?.user?.fname+" "+booking?.customer?.user?.lname,
                    roomNumber : booking?.room?.roomName,
                    checkIn : formatDate(booking?.startDate),
                    checkOut: formatDate(booking?.endDate)
                  };
                  reBooking.push(data)
                  console.log(data)
                })
                console.log(reBooking)
                setBooking(reBooking)
              }
            } catch (error) {
              console.error("Error fetching rooms:", error);
            }
          };
      
          fetchBooking();
        }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booking Information</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Room Number</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((booking,index) => (
            <tr key={booking.id+" "+index}>
              <td>{booking.id}</td>
              <td>{booking.customer}</td>
              <td>{booking.roomNumber}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
