"use client";

import { getAllUser } from '@/lib/getalluser';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



export default function Users() {
  const router = useRouter();
  const [users,setUser] = useState([])
  const { data: session, status } = useSession();
  if(session?.user?.pl?.role !== 'STAFF' && session?.user?.pl?.role !== 'ADMIN'){
    router.push("/")
    return
  }


  useEffect(() => {
        const fetchBooking = async () => {
          try {
            const response = await getAllUser(session?.user?.token)
            if (response.success) {
              const userData = response.data;
              console.log(userData)
              // การจัดกลุ่มห้องในแต่ละชั้น
              const reUser = []
              userData.forEach((user) =>{
                console.log(user?.fname+" "+user?.lname)
                const data = {
                  id: Number(user.userId),
                  name : user?.fname+" "+user?.lname,
                  email : user?.email,
                  phone : user?.phone,
                  role: user?.role,
                };
                reUser.push(data)
                console.log(data)
              })
              console.log(reUser)
              setUser(reUser)
            }
          } catch (error) {
            console.error("Error fetching rooms:", error);
          }
        };
    
        fetchBooking();
      }, []);

      useEffect(()=>{
        console.log(users)
      },[users])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
