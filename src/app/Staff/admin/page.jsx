"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAllUser } from "@/lib/getalluser";
import { changeRole } from "@/lib/updaterole";

export default function Users() {
  const router = useRouter();
  const [users, setUser] = useState([]);
  const { data: session, status } = useSession();
  if (
    session?.user?.pl?.role !== "STAFF" &&
    session?.user?.pl?.role !== "ADMIN"
  ) {
    router.push("/");
    return;
  }

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getAllUser(session?.user?.token);
        if (response.success) {
          const userData = response.data;
          console.log(userData);
          // การจัดกลุ่มห้องในแต่ละชั้น
          const reUser = [];
          userData.forEach((user) => {
            if(user?.role !== "ADMIN"){
            console.log(user?.fname + " " + user?.lname);
            const data = {
              id: Number(user?.userId),
              name: user?.fname + " " + user?.lname,
              email: user?.email,
              phone: user?.phone,
              role: user?.role,
            };
            reUser.push(data);
            console.log(data);
          }
        });
          console.log(reUser);
          setUser(reUser);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchBooking();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleRoleChange = async (userId) => {
    try {
      const user = users.find((user) => user.id === userId); // ค้นหาผู้ใช้ที่ต้องการเปลี่ยน role
      if (!user) {
        alert("User not found");
        return;
      }

      const newRole = user.role === "USER" ? "STAFF" : "USER"; // สลับบทบาท

      const response = await changeRole(userId,newRole,session?.user?.token); // ส่งคำขอไปยัง Backend
      if (response.success) {
        // อัปเดตบทบาทใน Frontend
        setUser((prevUsers) =>
          prevUsers.map(
            (u) => (u.id === userId ? { ...u, role: newRole } : u) // อัปเดต role ของ user ที่เกี่ยวข้อง
          )
        );
        alert(`Role updated successfully to ${newRole}`);
      } else {
        alert(`Failed to update role: ${response.message}`);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("An error occurred while updating the role.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Users</h1>
  
      {/* ตารางข้อมูลของผู้ใช้ */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th className={styles.roleColumn}>Role</th>
            <th className={styles.actionColumn}>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                {/* ปุ่มเปลี่ยน Role */}
                <button
                  onClick={() => handleRoleChange(user.id)}
                  className={styles.changeRoleButton}
                >
                  Change
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
}
