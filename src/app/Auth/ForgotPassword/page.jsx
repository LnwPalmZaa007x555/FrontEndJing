"use client";

import Navbar from '../../Navbar/Then/page';
import styles from './page.module.css';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setEmailError('Please enter your email'); // แสดงข้อความ error สีแดง
      setSuccessMessage(''); // ล้างข้อความ success
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('A password reset link has been sent to your email.');
        setEmailError('');
        setEmail('');
      } else {
        setEmailError('Failed to send reset link. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setEmailError('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <h1 className={styles.title}>Forgot Password</h1>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleResetSubmit}>
          <label className={styles.label}>Enter your email</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className={styles.errorText}>{emailError}</p>} {/* ข้อความสีแดง */}

          <button type="submit" className={styles.resetButton}>
            Send Reset Link
          </button>
        </form>
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </div>
    </div>
  );
}
