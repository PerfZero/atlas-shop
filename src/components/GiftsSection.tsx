'use client';

import styles from './GiftsSection.module.css';

export default function GiftsSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textOverlay}>
          <h2 className={styles.category}>подарки</h2>
          <h1 className={styles.title}>Без компромиссов. Только восхищение.</h1>
          <a href="#" className={styles.ctaLink}>Перейти к коллекции</a>
        </div>
      </div>
      <div className={styles.heroImage}></div>
    </section>
  );
} 