"use client";

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useSession } from 'next-auth/react';
import { getMe } from '@/lib/getuser';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { data: session, status } = useSession();
  const [ users,setUser ] = useState([])

  const router = useRouter();

    if(session?.user?.pl?.role !== 'STAFF' && session?.user?.pl?.role !== 'ADMIN'){
      router.push("/")
      return
    }


  useEffect(() => {
          const fetchBooking = async () => {
            try {
              const response = await getMe(session?.user?.token)
              if (response.success) {
                const userData = response.data;
                console.log(userData)
                // การจัดกลุ่มห้องในแต่ละชั้น
                const reUser = {
                  id: Number(userData.userId),
                  name : userData?.fname+" "+userData?.lname,
                  email : userData?.email,
                  phone : userData?.phone,
                  role: userData?.role,
                  joinedDate : userData?.createdAt
                };
                console.log(reUser)
                setUser(reUser)
              }
            } catch (error) {
              console.error("Error fetching rooms:", error);
            }
          };
      
          fetchBooking();
        }, []);
  // Mock Data สำหรับข้อมูล Staff
  const staffData = {
    name: 'จอน ยาเซ่น',
    email: 'john.doe@kimstar5.com',
    phone: '021456879',
    role: 'ประธานตึงๆ',
    joinedDate: '2023-01-15',
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>
      <div className={styles.card}>
        <div className={styles.infoGroup}>
          <label className={styles.label}>Name:</label>
          <p className={styles.value}>{users.name}</p>
        </div>
        <div className={styles.infoGroup}>
          <label className={styles.label}>Email:</label>
          <p className={styles.value}>{users.email}</p>
        </div>
        <div className={styles.infoGroup}>
          <label className={styles.label}>Phone:</label>
          <p className={styles.value}>{users.phone}</p>
        </div>
        <div className={styles.infoGroup}>
          <label className={styles.label}>Role:</label>
          <p className={styles.value}>{users.role}</p>
        </div>
        <div className={styles.infoGroup}>
          <label className={styles.label}>Joined Date:</label>
          <p className={styles.value}>{users.joinedDate}</p>
        </div>
      </div>
    </div>
  );
}
