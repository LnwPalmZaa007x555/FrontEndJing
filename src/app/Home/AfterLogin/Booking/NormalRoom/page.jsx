import Navbar from '../../../../Navbar/After/page';
import Link from 'next/link';
import styles from './page.module.css';

export default function NormalRoom() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <h1 className={styles.title}>KimStar5</h1>
      <div className={styles.roomContainer}>
        <img
          src="/Pictures/room.jpg"
          alt="Normal Room"
          className={styles.roomImage}
        />
        <div className={styles.roomDetails}>
          <h2 className={styles.roomTitle}>Normal Room - 3,500 BATH</h2>
          <p className={styles.roomDescription}>
            <strong>Details:</strong> <br />
            • Floors: 2nd - 4th <br />
            • Rooms available: 15 <br />
            • Maximum occupancy: 2 people <br />
          </p>
          <Link href="/Home/AfterLogin/Booking/NormalRoom/SelectRoom">
            <button className={styles.bookButton}>Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
