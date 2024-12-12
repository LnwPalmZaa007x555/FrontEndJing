"use client";
import { useSession } from "next-auth/react";

import Navbar from "../../Navbar/Before/page";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./page.module.css";

export default function HomePage() {
  const { session } = useSession();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src="/Pictures/room.jpg"
          alt="Hotel Hero Image"
          fill
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to KimStar5</h1>
          <p className={styles.heroSubtitle}>
            Discover the pinnacle of luxury and comfort in the heart of the city.
          </p>
          <Link href="/Auth/Login" className={styles.noUnderline}>
            <button className={styles.heroButton}>Book Now</button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <h2 className={styles.sectionTitle}>About KimStar5</h2>
        <div className={styles.aboutContent}>
          <p className={styles.aboutText}>
            KimStar5 is a sanctuary in the bustling city. Offering premium
            facilities and an elegant ambiance, it's the perfect escape for
            business or leisure travelers.
          </p>
          <div className={styles.swiperContainer}>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className={styles.swiper}
            >
              <SwiperSlide>
                <Image
                  src="/Pictures/room.jpg"
                  alt="Hotel View 1"
                  width={500}
                  height={300}
                  className={styles.aboutImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/Pictures/room.jpg"
                  alt="Hotel View 2"
                  width={500}
                  height={300}
                  className={styles.aboutImage}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/Pictures/room.jpg"
                  alt="Hotel View 3"
                  width={500}
                  height={300}
                  className={styles.aboutImage}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className={styles.rooms}>
        <h2 className={styles.sectionTitle}>Rooms</h2>
        <div className={styles.roomGrid}>
          <Link
            href="/Auth/Login"
            className={styles.noUnderline}
          >
            <div className={styles.roomCard}>
              <Image
                src="/Pictures/room.jpg"
                alt="Normal Room"
                width={400}
                height={300}
                className={styles.roomImage}
              />
              <h3 className={styles.roomTitle}>Normal Room</h3>
              <p className={styles.roomPrice}>3,500 BAHT / Month</p>
            </div>
          </Link>
          <Link
            href="/Auth/Login"
            className={styles.noUnderline}
          >
            <div className={styles.roomCard}>
              <Image
                src="/Pictures/room.jpg"
                alt="Premium Room"
                width={400}
                height={300}
                className={styles.roomImage}
              />
              <h3 className={styles.roomTitle}>Premium Room</h3>
              <p className={styles.roomPrice}>4,500 BAHT / Month</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
