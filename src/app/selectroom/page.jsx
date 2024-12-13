"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";

import styles from "./page.module.css";
import { listRooms } from "@/lib/api";


export default function FloorPlan() {
  const router = useRouter();
 
  const searchParams = useSearchParams(); // ใช้ useSearchParams
  const type = searchParams.get("type"); // ดึงค่า type จาก query string

  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(type)

    const fetchRooms = async () => {
      try {
        const roomlane = type == 0?[5,6]:[2,3,4]
        const response = await listRooms()
        if (response.data.success) {
          const roomsData = response.data.data;
          console.log(response.data)
          // การจัดกลุ่มห้องในแต่ละชั้น
          const reRoom = []
          roomsData.forEach((room) =>{
            if(roomlane.includes(Number(room.roomName[0]))){
              return 
            }
           const data = {
              roomId:Number(room.roomId),
              id:Number(room.roomName),
              status:room.roomStatus == 1?'booked' : 'available'
            }
            console.log(data)
            reRoom.push(data)
          })
          console.log('test'+reRoom)
          const groupedRooms = groupRoomsByFloor(reRoom);
          setFloors(groupedRooms);
          console.log(groupedRooms)
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const groupRoomsByFloor = (rooms) => {
    const floors = [];
    rooms.forEach((room) => {
      const floorNumber = Math.floor(Number(room.id) / 100); // การคำนวณชั้นจาก roomId (เช่น 201 -> 2nd floor)
      console.log(floorNumber)
      let floor = floors.find((f) => f.floorNumber === floorNumber);
      if (!floor) {
        // สร้างชื่อชั้นตาม floorNumber
        const floorName = floorNumber === 2 
          ? `${floorNumber} nd Floor` 
          : `${floorNumber} th Floor`;
  
        // เพิ่มชั้นใหม่ใน floors
        floor = {
          floorNumber,
          name: floorName,
          rooms: [],
        };
        floors.push(floor);
      }
      floor.rooms.push(room);
    });
    return floors;
  };


  const handleRoomClick = (roomName, roomStatus, floorNumber, roomId) => {
    if (roomStatus === "available") {
      router.push(
        `/selectroom/${floorNumber}/${roomName}?roomId=${roomId}`
      );
    } else if (roomStatus === "booked") {
      alert("This room is already booked!");
    } else if (roomStatus === "staff") {
      alert("This room is for staff!");
    }
    
  };

  return (
    <div className={styles.container}>
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
                        handleRoomClick(room.id, room.status, floor.floorNumber,room.roomId)
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
                        handleRoomClick(room.id, room.status, floor.floorNumber, room.roomId)
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
