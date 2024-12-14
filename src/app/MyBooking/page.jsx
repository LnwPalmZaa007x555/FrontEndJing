"use client";

import { getMyBooking, userUpdateBooking , userUpdateRooms } from "@/lib/mybooking";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MyBooking() {
  const router =  useRouter()
  const [ bookings, setBookings] = useState([])
  const { data: session, status } = useSession();

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
            const bookingsData = response.data;
            console.log(bookingsData)
            // การจัดกลุ่มห้องในแต่ละชั้น
            const reBooking = []
            bookingsData.forEach((booking) =>{
              console.log(booking?.customer?.user?.fname+" "+booking?.customer?.user?.lname)
              const data = {
                id: Number(booking.bookingId),
                title: `KimStar5 Floor ${booking.room.roomName[0]} Room ${booking.room.roomName}`,
                price: `${booking.room.roomPrice} BATH`,
                status: booking.bookingStatus == 0? "available":booking.bookingStatus == 1? "success":"cancled",
                checkIn: formatDate(booking.startDate), // แปลง startDate
                checkOut: formatDate(booking.endDate), // แปลง endDate
                guests: `${booking.numGuest}`,
                name : booking?.customer?.user?.fname+" "+booking?.customer?.user?.lname,
                email : booking?.customer?.user?.email,
                phone : booking?.customer?.user?.phone,
                roomId : booking?.roomId
              };
              reBooking.push(data)
            })
            console.log(reBooking)
            setBookings(reBooking)
          }
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };
  
      fetchBooking();
    }, []);

    const handleCancel = async (bookingId,roomId) => {
      try {
        const response = await userUpdateBooking(session?.user?.token, bookingId, 2); // เปลี่ยนสถานะเป็น 2 (canceled)
        if (response.success) {
          const updateRoomResponse = await userUpdateRooms(session?.user?.token,roomId, 0);


          if (!updateRoomResponse.success) {
            throw new Error("Failed to update room status");
          }

          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.id === bookingId ? { ...booking, status: "cancled" } : booking
            )
          );
          alert("Booking canceled successfully!");
          router.push("/mybooking")
        } else {
          alert("Failed to cancel booking.");
        }
      } catch (error) {
        console.error("Error canceling booking:", error);
        alert("An error occurred. Please try again na ja.");
      }
    };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Bookings</h1>
      <div className={styles.bookingsList}>
        {bookings.map((booking) => (
          <div key={booking.id} className={styles.bookingCard}>
            <div className={styles.bookingDetails}>
              <h2 className={styles.bookingTitle}>{booking.title}</h2>
              <div className={`${styles.bookingStatus} ${booking.status === "cancled" ? styles.canceled : styles.booked}`}>
                {booking.status}
              </div>
              <div className={styles.bookingPrice}>{booking.price}</div>
              {/* เงื่อนไขสำหรับ STAFF */}
            {session?.user?.pl?.role == "STAFF" && (
              <>
                <p>Name: {booking.name}</p>
                <p>Email: {booking.email}</p>
                <p>Phone: {booking.phone}</p>
              </>
            )}
              <p>Check in: {booking.checkIn}</p>
              <p>Check out: {booking.checkOut}</p>
              <p>No. of guests: {booking.guests}</p>

              {/* ปุ่ม Cancel */}
              {booking.status === "available" && (
                <button
                  className={styles.cancelButton}
                  onClick={()=>handleCancel(booking.id,booking.roomId)}
                >
                  Cancel Booking
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}