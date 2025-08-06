'use client';

import styles from './LiquidGlassHeader.module.css';

export default function LiquidGlassHeader() {
  return (
    <header className={styles.liquidGlassHeader}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Atlas Store</span>
        </div>
        
        <nav className={styles.navigation}>
          <a href="#" className={styles.navLink}>Главная</a>
          <a href="#" className={styles.navLink}>Каталог</a>
          <a href="#" className={styles.navLink}>О нас</a>
          <a href="#" className={styles.navLink}>Контакты</a>
        </nav>
        
        <div className={styles.actions}>
          <button className={styles.actionButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button className={styles.actionButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}