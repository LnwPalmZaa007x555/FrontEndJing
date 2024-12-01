"use client";

import { useRouter } from "next/navigation";
import Navbar from "../../../../../Navbar/After/page";
import styles from "./page.module.css";

export default function FloorPlan() {
  const router = useRouter();

  const floors = [
    {
      name: "2nd Floor",
      floorNumber: "2nd",
      rooms: [
        { id: 201, status: "available" },
        { id: 202, status: "available" },
        { id: 203, status: "available" },
        { id: 204, status: "available" },
        { id: 205, status: "booked" },
        { id: 206, status: "available" },
        { id: 207, status: "available" },
        { id: 208, status: "available" },
        { id: 209, status: "available" },
        { id: 210, status: "available" },
        { id: 211, status: "available" },
        { id: 212, status: "available" },
        { id: 213, status: "available" },
        { id: 214, status: "available" },
        { id: 215, status: "available" },
        { id: "Staff", status: "staff" },
      ],
    },
    {
      name: "3rd Floor",
      floorNumber: "3rd",
      rooms: [
        { id: 301, status: "available" },
        { id: 302, status: "available" },
        { id: 303, status: "available" },
        { id: 304, status: "available" },
        { id: 305, status: "booked" },
        { id: 306, status: "available" },
        { id: 307, status: "available" },
        { id: 308, status: "available" },
        { id: 309, status: "available" },
        { id: 310, status: "available" },
        { id: 311, status: "available" },
        { id: 312, status: "available" },
        { id: 313, status: "available" },
        { id: 314, status: "available" },
        { id: 315, status: "available" },
        { id: "Staff", status: "staff" },
      ],
    },
    {
      name: "4th Floor",
      floorNumber: "4th",
      rooms: [
        { id: 401, status: "booked" },
        { id: 402, status: "available" },
        { id: 403, status: "available" },
        { id: 404, status: "available" },
        { id: 405, status: "booked" },
        { id: 406, status: "available" },
        { id: 407, status: "available" },
        { id: 408, status: "available" },
        { id: 409, status: "available" },
        { id: 410, status: "available" },
        { id: 411, status: "available" },
        { id: 412, status: "available" },
        { id: 413, status: "available" },
        { id: 414, status: "available" },
        { id: 415, status: "available" },
        { id: "Staff", status: "staff" },
      ],
    },
  ];

  const handleRoomClick = (roomId, roomStatus, floorNumber) => {
    if (roomStatus === "available") {
      router.push(
        `/Home/AfterLogin/Booking/NormalRoom/SelectRoom/Payment/${floorNumber}/${roomId}`
      );
    } else if (roomStatus === "booked") {
      alert("This room is already booked!");
    } else if (roomStatus === "staff") {
      alert("This room is for staff!");
    }
    
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <h1 className={styles.title}>KimStar5 - Room Selection</h1>
      <div className={styles.floorPlan}>
        {floors.map((floor, index) => (
          <div key={index} className={styles.floor}>
            <div className={styles.floorLabel}>{floor.name}</div>
            <div className={styles.roomLayout}>
              <div className={styles.roomsRow}>
                {floor.rooms.slice(0, 8).map((room) => {
                  const roomClass =
                    room.status === "booked"
                      ? styles.booked
                      : room.status === "staff"
                      ? styles.staff
                      : styles.available;

                  return (
                    <div
                      key={room.id}
                      className={`${styles.room} ${roomClass}`}
                      onClick={() =>
                        handleRoomClick(room.id, room.status, floor.floorNumber)
                      }
                    >
                      {room.id}
                    </div>
                  );
                })}
              </div>
              <div className={styles.hallway}>
                <span>hallway</span>
                <span className={styles.elevator}>elevator</span>
              </div>
              <div className={styles.roomsRow}>
                {floor.rooms.slice(8).map((room) => {
                  const roomClass =
                    room.status === "booked"
                      ? styles.booked
                      : room.status === "staff"
                      ? styles.staff
                      : styles.available;

                  return (
                    <div
                      key={room.id}
                      className={`${styles.room} ${roomClass}`}
                      onClick={() =>
                        handleRoomClick(room.id, room.status, floor.floorNumber)
                      }
                    >
                      {room.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
