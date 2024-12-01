"use client";

import { useState } from "react";

export default function Home() {
  // Mock Data สำหรับห้องพักและการจอง
  const mockRooms = [
    { id: 1, name: "Room 101", floor: 1, status: "Available", price: 3500 },
    { id: 2, name: "Room 102", floor: 1, status: "Occupied", price: 3500 },
  ];

  const mockBookings = [
    { id: 1, roomId: 1, customerName: "จู๋โด่", checkIn: "2024-11-25", checkOut: "2024-11-27" },
    { id: 2, roomId: 2, customerName: "ควยตั้ง", checkIn: "2024-11-28", checkOut: "2024-11-30" },
  ];

  // สถานะสำหรับแสดงข้อมูล
  const [rooms] = useState(mockRooms);
  const [bookings] = useState(mockBookings);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Hotel Management Dashboard</h1>

      {/* ส่วนแสดงรายการห้องพัก */}
      <section style={{ marginBottom: "40px" }}>
        <h2>Rooms</h2>
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Floor</th>
              <th>Status</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.floor}</td>
                <td>{room.status}</td>
                <td>{room.price} BAHT</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ส่วนแสดงรายการการจอง */}
      <section>
        <h2>Bookings</h2>
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Room ID</th>
              <th>Customer Name</th>
              <th>Check-In</th>
              <th>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.roomId}</td>
                <td>{booking.customerName}</td>
                <td>{booking.checkIn}</td>
                <td>{booking.checkOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
