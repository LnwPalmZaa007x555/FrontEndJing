"use client";

import Navbar from '../../Navbar/Then/page';
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { register } from '../../../lib/api'

export default function Register() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value; // กำหนดค่าเริ่มต้นให้เป็นค่าจาก input

    switch (name) {
      case 'fname':
        if (/^[a-zA-Z]*$/.test(value)) {
          formattedValue = capitalizeFirstLetter(value); // ทำตัวอักษรแรกเป็นพิมพ์ใหญ่
          setFormData((prevData) => ({
            ...prevData,
            fname: formattedValue,
          }));
          setFirstNameError('');
        } else {
          setFirstNameError('First name must only contain letters.');
        }
        break;

      case 'lname': 
        if (/^[a-zA-Z]*$/.test(value)) {
          formattedValue = capitalizeFirstLetter(value); // ทำตัวอักษรแรกเป็นพิมพ์ใหญ่
          setFormData((prevData) => ({
            ...prevData,
            lname: formattedValue,
          }));
          setLastNameError('');
        } else {
          setLastNameError('Last name must only contain letters.');
        }
        break;

      case 'phone':
        if (/^\d{0,10}$/.test(value)) {
          setFormData((prevData) => ({
            ...prevData,
            phone: value,
          }));
          setPhoneError('');
        } else {
          setPhoneError('Phone number must contain only digits and up to 10 characters.');
        }
        break;

      case 'email':
        const filteredEmail = value.replace(/[^a-zA-Z0-9@._-]/g, '');
        setFormData((prevData) => ({
          ...prevData,
          email: filteredEmail,
        }));
        setEmailError('');
        break;

      case 'password':
        if (/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]*$/.test(value)) {
          setFormData((prevData) => ({
            ...prevData,
            password: value,
          }));
          setPasswordError('');
        } else {
          setPasswordError('Password contains invalid characters.');
        }
        break;

      default:
        break;
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // การตรวจสอบข้อมูลเบื้องต้น
    if (formData.fname.trim() === '') {
      setFirstNameError('Please enter your first name');
      isValid = false;
    }

    if (formData.lname.trim() === '') {
      setLastNameError('Please enter your last name');
      isValid = false;
    }

    if (formData.phone.length !== 10) {
      setPhoneError('Please enter a 10-digit phone number');
      isValid = false;
    }

    if (formData.email.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      validateEmail();
    }

    if (formData.password.length < 8) {
      setPasswordError('Please enter a password with at least 8 characters');
      isValid = false;
    }

    if (isValid) {
      alert('Registration successful');
      router.push('/Home/AfterLogin');
    }

    const { fname, lname, email, password, phone } = formData;
    try {
      const resp = await register({ fname, lname, email, password, phone });
      console.log(resp);
    } catch (err) {
      console.log(err);
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
            name="fname"
            value={formData.fname}
            className={styles.input}
            placeholder="Enter here"
            onChange={handleInputChange}
          />
          {firstNameError && <p className={styles.errorText}>{firstNameError}</p>}

          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            className={styles.input}
            placeholder="Enter here"
            onChange={handleInputChange}
          />
          {lastNameError && <p className={styles.errorText}>{lastNameError}</p>}

          <label className={styles.label}>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            className={styles.input}
            placeholder="Enter here"
            onChange={handleInputChange}
            maxLength={10}
          />
          {phoneError && <p className={styles.errorText}>{phoneError}</p>}

          <label className={styles.label}>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            className={styles.input}
            placeholder="Enter here"
            onChange={handleInputChange}
            onBlur={validateEmail}
          />
          {emailError && <p className={styles.errorText}>{emailError}</p>}

          <label className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className={styles.input}
            placeholder="Enter here"
            onChange={handleInputChange}
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
