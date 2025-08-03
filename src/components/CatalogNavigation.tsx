'use client';

import styles from './CatalogNavigation.module.css';

export default function CatalogNavigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navContent}>
        <div className={styles.dropdownMenu}>
          <button className={styles.dropdownButton}>
            <span>Для женщин</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.categoryButtons}>
          <button className={`${styles.categoryButton} ${styles.active}`}>Абайя</button>
          <button className={styles.categoryButton}>Платья</button>
          <button className={styles.categoryButton}>Платки и хиджабы</button>
          <button className={styles.categoryButton}>Кимары</button>
          <button className={styles.categoryButton}>Костюмы</button>
          <button className={styles.categoryButton}>Для Умры и Хаджа</button>
          <button className={styles.categoryButton}>Молитвенные комплекты</button>
          <button className={styles.categoryButton}>Капсульные</button>
        </div>

        <div className={styles.separator}></div>

        <button className={styles.filterButton}>
        <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.7176 9.27739C8.38056 9.27739 8.92296 8.73495 8.92296 8.07203C8.92296 7.40908 8.38056 6.86668 7.7176 6.86668C7.05464 6.86668 6.50723 7.40908 6.50723 8.07203C6.50723 8.73495 7.05464 9.27739 7.7176 9.27739ZM7.7176 8.65965C7.38614 8.65965 7.12999 8.39848 7.12999 8.07203C7.12999 7.73552 7.38614 7.48442 7.7176 7.48442C8.04906 7.48442 8.30522 7.73552 8.30522 8.07203C8.30522 8.39848 8.04906 8.65965 7.7176 8.65965ZM6.91904 7.66523H1.2589C1.0329 7.66523 0.857117 7.84601 0.857117 8.07203C0.857117 8.29802 1.0329 8.47382 1.2589 8.47382H6.91904V7.66523ZM10.5904 7.66523H8.5915V8.47382H10.5904C10.7963 8.47382 10.9771 8.29802 10.9771 8.07203C10.9771 7.84601 10.7963 7.66523 10.5904 7.66523ZM4.17185 6.21375C4.83479 6.21375 5.37722 5.66633 5.37722 5.00338C5.37722 4.34044 4.83479 3.79802 4.17185 3.79802C3.5089 3.79802 2.96649 4.34044 2.96649 5.00338C2.96649 5.66633 3.5089 6.21375 4.17185 6.21375ZM4.17185 5.59099C3.8454 5.59099 3.58424 5.32982 3.58424 5.00338C3.58424 4.67191 3.8454 4.41577 4.17185 4.41577C4.50332 4.41577 4.75946 4.67191 4.75946 5.00338C4.75946 5.32982 4.50332 5.59099 4.17185 5.59099ZM1.23881 4.59657C1.0329 4.59657 0.857117 4.77738 0.857117 5.00338C0.857117 5.22941 1.0329 5.40516 1.23881 5.40516H3.30801V4.59657H1.23881ZM10.5703 4.59657H4.9704V5.40516H10.5703C10.7963 5.40516 10.9771 5.22941 10.9771 5.00338C10.9771 4.77738 10.7963 4.59657 10.5703 4.59657ZM7.7176 3.1401C8.38056 3.1401 8.92296 2.59769 8.92296 1.93475C8.92296 1.2718 8.38056 0.724365 7.7176 0.724365C7.05464 0.724365 6.50723 1.2718 6.50723 1.93475C6.50723 2.59769 7.05464 3.1401 7.7176 3.1401ZM7.7176 2.52236C7.38614 2.52236 7.12999 2.2612 7.12999 1.92972C7.12999 1.59825 7.38614 1.34211 7.7176 1.34211C8.04906 1.34211 8.30522 1.59825 8.30522 1.92972C8.30522 2.2612 8.04906 2.52236 7.7176 2.52236ZM6.94416 1.53296H1.2589C1.0329 1.53296 0.857117 1.70874 0.857117 1.93475C0.857117 2.16075 1.0329 2.34155 1.2589 2.34155H6.94416V1.53296ZM10.5904 1.53296H8.52117V2.34155H10.5904C10.7963 2.34155 10.9771 2.16075 10.9771 1.93475C10.9771 1.70874 10.7963 1.53296 10.5904 1.53296Z" fill="black" />
</svg>
          <span>Фильтры</span>
        </button>
      </div>
    </nav>
  );
} 