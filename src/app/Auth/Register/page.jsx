"use client";

import Navbar from '../../Navbar/Then/page';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleFirstNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z]*$/.test(input)) {
      setFirstName(capitalizeFirstLetter(input));
      setFirstNameError('');
    }
  };

  const handleLastNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z]*$/.test(input)) {
      setLastName(capitalizeFirstLetter(input));
      setLastNameError('');
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setPhone(input);
      setPhoneError('');
    }
  };

  const handleEmailChange = (e) => {
    const input = e.target.value;
    // กรองเฉพาะภาษาอังกฤษ ตัวเลข และอักขระที่อนุญาตในอีเมล
    const filteredInput = input.replace(/[^a-zA-Z0-9@._-]/g, '');
    setEmail(filteredInput);
    setEmailError('');
  };

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]*$/.test(input)) {
      setPassword(input);
      setPasswordError('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (firstName.trim() === '') {
      setFirstNameError('Please enter your first name');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (lastName.trim() === '') {
      setLastNameError('Please enter your last name');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (phone.length !== 10) {
      setPhoneError('Please enter a 10-digit phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (email.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      validateEmail();
    }

    if (password.length < 8) {
      setPasswordError('Please enter a password with at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      alert('Registration successful');
      router.push('/Home/AfterLogin');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <h1 className={styles.title}>KimStar5</h1>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter here"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          {firstNameError && <p className={styles.errorText}>{firstNameError}</p>}

          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter here"
            value={lastName}
            onChange={handleLastNameChange}
          />
          {lastNameError && <p className={styles.errorText}>{lastNameError}</p>}

          <label className={styles.label}>Phone</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter here"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={10}
          />
          {phoneError && <p className={styles.errorText}>{phoneError}</p>}

          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter here"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
          />
          {emailError && <p className={styles.errorText}>{emailError}</p>}

          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter here"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className={styles.errorText}>{passwordError}</p>}

          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>

        <div className={styles.linkContainer}>
          <a href="/Auth/Login" className={styles.link}>
            Sign in?
          </a>
        </div>
      </div>
    </div>
  );
}
