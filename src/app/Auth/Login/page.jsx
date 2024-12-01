"use client";

import Navbar from '../../Navbar/Then/page';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  const handleEmailChange = (e) => {
    const input = e.target.value;
    // กรองเฉพาะอักษรภาษาอังกฤษ ตัวเลข และอักขระพิเศษที่ใช้ในอีเมลเท่านั้น
    const filteredInput = input.replace(/[^a-zA-Z0-9@._-]/g, '');
    setEmail(filteredInput);
    setEmailError(''); // ล้างข้อความเตือนเมื่อกรอกถูกต้อง
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    // กรองให้สามารถกรอกอักษรภาษาอังกฤษ ตัวเลข และอักขระพิเศษในรหัสผ่านได้
    const filteredInput = input.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]/g, '');
    setPassword(filteredInput);
    setPasswordError(''); // ล้างข้อความเตือนเมื่อกรอกถูกต้อง
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // ตรวจสอบว่ากรอก email หรือ password ครบถ้วนหรือไม่
    if (email.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // หากข้อมูลครบถ้วนให้ทำการ sign in และนำทางไปหน้าแรก
    if (isValid) {
      alert('Sign in successful');
      router.push('/Home/AfterLogin'); // นำทางไปที่หน้าแรก
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar/>
      </header>
      <h1 className={styles.title}>KimStar5</h1>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Here"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className={styles.errorText}>{emailError}</p>}
          
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter Here"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className={styles.errorText}>{passwordError}</p>}

          <button 
            type="submit" 
            className={styles.signInButton}
          >
            Sign In
          </button>
          
          <div className={styles.linkContainer}>
            <a href="/Auth/Register" className={styles.link}>Register?</a>
            <a href="/Auth/ForgotPassword" className={styles.link}>Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
