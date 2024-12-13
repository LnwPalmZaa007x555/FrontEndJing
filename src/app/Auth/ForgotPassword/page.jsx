"use client";

import userResetlink from '@/lib/sendresetlinl';
import styles from './page.module.css';
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setEmailError('Please enter your email'); // แสดงข้อความ error สีแดง
      setSuccessMessage(''); // ล้างข้อความ success
      return;
    }

    try {
      const response = await userResetlink({ email })
      console.log(response)
      if (response?.success) {
        setSuccessMessage('A password reset link has been sent to your email.');
        setEmailError('');
        setEmail('');
      } else {
        setEmailError('Failed to send reset link. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
      console.log(error)
    }
  };

  return (
    <div className={styles.container}>
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
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
}
