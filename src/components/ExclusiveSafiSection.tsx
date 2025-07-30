'use client';

import styles from './ExclusiveSafiSection.module.css';

export default function ExclusiveSafiSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textOverlay}>
          <h2 className={styles.category}>Exclusive Safi</h2>
          <h1 className={styles.title}>Авторские аксессуары из Дубая</h1>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>4.9</span>
              <span className={styles.statLabel}>Рейтинг магазина</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>+200</span>
              <span className={styles.statLabel}>Кол-во покупок</span>
            </div>
          </div>
          <a href="#" className={styles.ctaLink}>Перейти к магазину</a>
        </div>
      </div>
      <div className={styles.heroImage}></div>
    </section>
  );
} 