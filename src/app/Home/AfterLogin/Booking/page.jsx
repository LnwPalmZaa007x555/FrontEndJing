import Navbar from '../../../Navbar/After/page';
import Link from 'next/link';
import styles from './page.module.css';

export default function Booking() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <h1 className={styles.title}>KimStar5</h1>
      <div className={styles.roomList}>
        {/* Normal Room */}
        <div className={styles.roomCard}>
          <img
            src="/Pictures/room.jpg"
            alt="Normal Room"
            className={styles.roomImage}
          />
          <div className={styles.roomDetails}>
            <h3 className={styles.roomTitle}>Normal Room - 3500 BATH</h3>
            <p className={styles.roomDescription}>
              2nd - 4th floor <br />
              15 rooms <br />
              Maximum 2 people
            </p>
            <Link href="/Home/AfterLogin/Booking/NormalRoom">
              <button className={styles.roomButton}>See More</button>
            </Link>
          </div>
        </div>

        {/* Premium Room */}
        <div className={styles.roomCard}>
          <img
            src="/Pictures/room.jpg"
            alt="Premium Room"
            className={styles.roomImage}
          />
          <div className={styles.roomDetails}>
            <h3 className={styles.roomTitle}>Premium Room - 4500 BATH</h3>
            <p className={styles.roomDescription}>
              5th - 6th floor <br />
              7 rooms <br />
              Maximum 3 people
            </p>
            <Link href="/Home/AfterLogin/Booking/PremiumRoom">
              <button className={styles.roomButton}>See More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
