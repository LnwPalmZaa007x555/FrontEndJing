"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import listRoom from "@/lib/listroom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Rooms() {
  const [roomsData, setRoomsData] = useState({
    normal: {},
    premium: {}
  });

  const router = useRouter();

  const [selectedRoom, setSelectedRoom] = useState(null);

  const { data: session, status } = useSession();
      if(session?.user?.pl?.role !== 'STAFF' && session?.user?.pl?.role !== 'ADMIN'){
        router.push("/")
        return
      }

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await listRoom();
        if (response.success) {
          const apiRoomsData = response.data;
          console.log("API Response:", apiRoomsData);

          const formattedRoomsData = mapRoomsData(apiRoomsData);
          console.log("Formatted Rooms Data:", formattedRoomsData);

          setRoomsData(formattedRoomsData);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const mapRoomsData = (apiData) => {
    const groupedRooms = {
      normal: {},
      premium: {}
    };

    apiData.forEach((room) => {
      const floorNumber = Math.floor(Number(room.roomName) / 100);
      const roomType = floorNumber >= 2 && floorNumber <= 4 ? "normal" :
                       floorNumber >= 5 && floorNumber <= 6 ? "premium" : 
                       null;

      if (!roomType) return;

      if (!groupedRooms[roomType][floorNumber]) {
        groupedRooms[roomType][floorNumber] = [];
      }

      groupedRooms[roomType][floorNumber].push({
        number: Number(room.roomName),
        status: room.roomStatus === 1 ? "Booked" : "Available",
        ...(room.roomStatus === 1 && { bookedBy: { name: "Unknown", email: "Unknown" } }),
      });
    });

    return groupedRooms;
  };

  const handleRoomClick = (room) => {
    if (room.status === "Booked") {
      setSelectedRoom(room);
    }
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Room Information</h1>

      {Object.keys(roomsData.normal || {}).map((floor) => (
        <div key={floor} className={styles.floorSection}>
          <h2 className={styles.floorTitle}>Normal Room - Floor {floor}</h2>
          <div className={styles.roomsContainer}>
            {roomsData.normal[floor].map((room, idx) => (
              <div
                className={`${styles.roomCard} ${room.status === "Booked" ? styles.bookedCard : ""}`}
                key={idx}
                onClick={() => handleRoomClick(room)}
              >
                <p>Room Number: {room.number}</p>
                <p>Status: {room.status}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(roomsData.premium || {}).map((floor) => (
        <div key={floor} className={styles.floorSection}>
          <h2 className={styles.floorTitle}>Premium Room - Floor {floor}</h2>
          <div className={styles.roomsContainer}>
            {roomsData.premium[floor].map((room, idx) => (
              <div
                className={`${styles.roomCard} ${room.status === "Booked" ? styles.bookedCard : ""}`}
                key={idx}
                onClick={() => handleRoomClick(room)}
              >
                <p>Room Number: {room.number}</p>
                <p>Status: {room.status}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedRoom && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Room Number: {selectedRoom.number}</p>
            <p>Status: {selectedRoom.status}</p>           
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
