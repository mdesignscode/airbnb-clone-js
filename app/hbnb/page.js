"use client";
import styles from './page.module.css';
import Places from './Places';
import Filters from './Filters';
import { useEffect, useState } from 'react';

const storageType = process.env.HBNB_TYPE_STORAGE;

export default function HBNB () {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const apiStatus = document.querySelector('[api]');
    async function setStatusColor () {
      const api = await fetch('https://airbnb-clone-js-api.onrender.com/api/v1/status');
      const { status } = await api.json();
      if (status === 'OK')
        apiStatus.style.backgroundColor = '#ff545f';
    }

    setStatusColor();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div id={styles.api_status} api="api_status"></div>
      </header>
      <div className={styles.container}>
        <Filters {...{ setPlaces }} />

        <Places {...{ places, setPlaces }} />
      </div>
      <footer className={styles.footer}>Best School</footer>
    </>
  );
}
