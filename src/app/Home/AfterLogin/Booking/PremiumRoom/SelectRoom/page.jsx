"use client";

import { useRouter } from "next/navigation";
import Navbar from "../../../../../Navbar/After/page";
import styles from "./page.module.css";

export default function FloorPlan() {
  const router = useRouter();

  const floors = [
    {
      name: "5th floor",
      floorNumber: "5th",
      rooms: [
        { id: 504, status: "available" },
        { id: 505, status: "available" },
        { id: 506, status: "available" },
        { id: 507, status: "available" },
        { id: 503, status: "available" },
        { id: 502, status: "available" },
        { id: 501, status: "available" },
        { id: "Staff", status: "staff" },
      ],
    },
    {
      name: "6th floor",
      floorNumber: "6th",
      rooms: [
        { id: 604, status: "available" },
        { id: 605, status: "available" },
        { id: 606, status: "available" },
        { id: 607, status: "available" },
        { id: 603, status: "available" },
        { id: 602, status: "available" },
        { id: 601, status: "available" },
        { id: "Staff", status: "staff" },
      ],
    },
  ];

  const handleRoomClick = (roomId, roomStatus, floorNumber) => {
    if (roomStatus === "available") {
      router.push(
        `/Home/AfterLogin/Booking/PremiumRoom/SelectRoom/Payment/${floorNumber}/${roomId}`
      );
    } else if (roomStatus === "booked") {
      alert("This room is already booked!");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <h1 className={styles.title}>KimStar5 - Floor Plan</h1>
      <div className={styles.floorPlan}>
        {floors.map((floor, index) => (
          <div key={index} className={styles.floor}>
            <div className={styles.floorLabel}>{floor.name}</div>
            <div className={styles.roomLayout}>
              <div className={styles.roomsRow}>
                {floor.rooms.slice(0, 4).map((room) => {
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
                <span>Hallway</span>
                <span className={styles.elevator}>Elevator</span>
              </div>
              <div className={styles.roomsRow}>
                {floor.rooms.slice(4).map((room) => {
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
