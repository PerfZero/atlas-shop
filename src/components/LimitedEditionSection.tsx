'use client';

import styles from './LimitedEditionSection.module.css';

export default function LimitedEditionSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textOverlay}>
          <h2 className={styles.category}>Limited Edition</h2>
          <h1 className={styles.title}>Расцветай на каждом шагу</h1>
          <a href="#" className={styles.ctaLink}>Перейти к магазину</a>
        </div>
      </div>
      <div className={styles.heroImage}></div>
    </section>
  );
} 