"use client";
import Link from "next/link";
import { use, useEffect } from "react";
import styles from "./page.module.css";

const page = ({ params }) => {
  const resolvedParams = use(params); 
  const roomIndex = Number(resolvedParams.roomtype)-1; 
  
  const info = [
    { 
      name: "Normal room",
      floor: "2nd - 4th",
      max: "2 people",
      price: 3500,
      image: "/Pictures/normalroom.jpg",
    },
    { 
      name: "Premium room",
      floor: "5th - 6th",
      max: "3 people",
      price: 4500,
      img: "/Pictures/premiumroom1.jpg",
    },
  ];

  if (isNaN(roomIndex) || roomIndex < 0 || roomIndex >= info.length) {
    return <div>Error: Invalid room type.</div>;
  }

  const selectedRoom = info[roomIndex];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>KimStar5</h1>
      <div className={styles.roomContainer}>
        <img
          src={selectedRoom.image || selectedRoom.img}
          alt={`${selectedRoom.name} image`}
          className={styles.roomImage}
        />
        <div className={styles.roomDetails}>
          <h2 className={styles.roomTitle}>
            {selectedRoom.name} - {selectedRoom.price} BATH
          </h2>
          <p className={styles.roomDescription}>
            <strong>Details:</strong> <br />
            • Floors: {selectedRoom.floor} <br />
            • Maximum occupancy: {selectedRoom.max} <br />
          </p>
          <Link href={`/selectroom?type=${roomIndex}`}>
            <button className={styles.bookButton}>Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
