'use client';

import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textOverlay}>
          <h2 className={styles.category}>ДЛЯ ЖЕНЩИН</h2>
          <h1 className={styles.title}>New: Umrah Collection</h1>
          <a href="#" className={styles.ctaLink}>Перейти к покупкам</a>
        </div>
      </div>
      <div className={styles.heroImage}></div>
    </section>
  );
}