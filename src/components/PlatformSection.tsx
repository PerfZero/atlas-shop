'use client';

import styles from './PlatformSection.module.css';

export default function PlatformSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textOverlay}>
          <h1 className={styles.title}>Присоединяйтесь к платформе нового уровня</h1>
          <p className={styles.description}>
            Доступ к платёжеспособной аудитории, премиум-подача, маркетинг от нас.
          </p>
          <p className={styles.subtitle}>От Вас - только качество.</p>
          <a href="#" className={styles.ctaLink}>Перейти к покупкам</a>
        </div>
      </div>
      <div className={styles.heroImage}></div>
    </section>
  );
} 