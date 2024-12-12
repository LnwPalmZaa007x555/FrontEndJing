"use client";

import Navbar from '../../Navbar/Then/page';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {  } from '../../../lib/api'
import { signIn } from 'next-auth/react';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate input immediately
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    }

    if (name === 'password') {
      if (value.length < 8) {
        setPasswordError('Password must be at least 8 characters');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // ตรวจสอบว่ากรอก email หรือ password ครบถ้วนหรือไม่
    if (formData.email.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (formData.password.trim() === '') {
      setPasswordError('Please enter your password');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // หากข้อมูลครบถ้วนให้ทำการ sign in และนำทางไปหน้าแรก
    if (isValid) {
      try {
        const email = formData.email
        const password = formData.password
        const result = await signIn('credentials',{
          redirect: false,
          email,
          password
        })
  
        if (result.error) {
          console.error(result.error);
          alert('Login failed: ' + result.error);
        } else {
          router.push('/');
        }        
      } catch (error) {
        console.log('error', error)
      }
      alert('Sign in successful');
      console.log('Form data submitted:', formData);
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
            name="email"
            className={styles.input}
            placeholder="Enter Here"
            value={formData.email}
            onChange={handleInputChange}
          />
          {emailError && <p className={styles.errorText}>{emailError}</p>}
          
          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            className={styles.input}
            placeholder="Enter Here"
            value={formData.password}
            onChange={handleInputChange}
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
