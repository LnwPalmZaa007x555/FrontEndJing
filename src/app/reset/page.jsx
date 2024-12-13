"use client";

import userResetPassword from '@/lib/resetpassword';
import styles from './page.module.css';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

    const searchParams = useSearchParams(); // ใช้ useSearchParams
      const resetToken = searchParams.get("token");

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่าอีเมลไม่ว่างเปล่า
    if (email.trim() === '') {
      setError('Please enter your email');
      setSuccessMessage('');
      return;
    }

    // ตรวจสอบว่าใส่รหัสผ่าน 2 ครั้งเหมือนกัน
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSuccessMessage('');
      return;
    }

    // ตรวจสอบรหัสผ่านว่ามีแค่ภาษาอังกฤษและตัวเลข
    const passwordRegex = /^[A-Za-z0-9]+$/;
    if (!passwordRegex.test(password)) {
      setError('Password can only contain letters and numbers');
      setSuccessMessage('');
      return;
    }
    
    console.log("eiei")
    try {
      const response = await userResetPassword({token:resetToken , password})
      if (response.success) {
        setSuccessMessage('Password has been reset successfully.');
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError('Failed to reset password. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Password</h1>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleResetSubmit}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.label}>New Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className={styles.label}>Confirm Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className={styles.errorText}>{error}</p>}
          <button type="submit" className={styles.resetButton}>
            Reset Password
          </button>
        </form>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </div>
    </div>
  );
}