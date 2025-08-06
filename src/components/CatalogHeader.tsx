'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './AtlasHeader.module.css';
import AuthModal from './AuthModal';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { WordPressAPI } from '../services/wordpressApi';

export default function CatalogHeader() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { cartCount } = useCart();
  const { isAuthenticated, token } = useAuth();

  const handleUserClick = () => {
    if (isAuthenticated) {
      // Если авторизован, переходим в профиль
      window.location.href = '/profile';
    } else {
      // Если не авторизован, открываем модальное окно
      setIsAuthModalOpen(true);
    }
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    const loadWishlistCount = async () => {
      if (token) {
        try {
          const result = await WordPressAPI.getWishlistCount(token);
          if (result.success) {
            setWishlistCount(result.count || 0);
          }
        } catch (error) {
          console.error('Ошибка загрузки количества избранного:', error);
        }
      } else {
        setWishlistCount(0);
      }
    };

    loadWishlistCount();
  }, [token]);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.leftSection}>
          <button className={styles.menuButton}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1C0 0.447715 0.447715 0 1 0H17C17.5523 0 18 0.447715 18 1C18 1.55228 17.5523 2 17 2H1C0.447715 2 0 1.55228 0 1Z" fill="currentColor"/>
              <path d="M0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7Z" fill="currentColor"/>
              <path d="M0 13C0 12.4477 0.447715 12 1 12H17C17.5523 12 18 12.4477 18 13C18 13.5523 17.5523 14 17 14H1C0.447715 14 0 13.5523 0 13Z" fill="currentColor"/>
            </svg>
            <span className={styles.menuText}>Меню</span>
          </button>
          <button className={styles.searchButton}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2002_50)">
                <path d="M0.285721 4.86495C0.285721 7.07477 2.08371 8.87275 4.29353 8.87275C5.16741 8.87275 5.96596 8.59152 6.62391 8.11941L9.09488 10.5954C9.21038 10.7109 9.36106 10.7662 9.52178 10.7662C9.86331 10.7662 10.0993 10.51 10.0993 10.1736C10.0993 10.0128 10.0391 9.86717 9.93359 9.7617L7.47766 7.29072C7.99499 6.61774 8.30134 5.77902 8.30134 4.86495C8.30134 2.65513 6.50335 0.85714 4.29353 0.85714C2.08371 0.85714 0.285721 2.65513 0.285721 4.86495ZM1.14454 4.86495C1.14454 3.12723 2.55581 1.71596 4.29353 1.71596C6.03123 1.71596 7.44252 3.12723 7.44252 4.86495C7.44252 6.60265 6.03123 8.01394 4.29353 8.01394C2.55581 8.01394 1.14454 6.60265 1.14454 4.86495Z" fill="currentColor" />
              </g>
              <defs>
                <clipPath id="clip0_2002_50">
                  <rect width="9.8136" height="9.90904" fill="white" transform="translate(0.285721 0.85714)" />
                </clipPath>
              </defs>
            </svg>
            <span className={styles.searchText}>Поиск</span>
          </button>
        </div>

        <div className={styles.logo}>
          <Link href="/">
            <img src="/logo.svg" alt="Atlas Store" />
          </Link>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.contactLink}>
            <span>Контакты</span>
          </div>
          <Link href="/profile?tab=wishlist" className={styles.iconButton}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2002_42)">
                <path d="M0.142822 5.16741C0.142822 8.02011 2.53345 10.8259 6.31025 13.2366C6.45088 13.3237 6.65174 13.4174 6.79237 13.4174C6.93299 13.4174 7.13391 13.3237 7.28122 13.2366C11.0513 10.8259 13.4419 8.02011 13.4419 5.16741C13.4419 2.79687 11.8147 1.12276 9.64505 1.12276C8.40619 1.12276 7.40174 1.71205 6.79237 2.61607C6.19642 1.71875 5.17854 1.12276 3.9397 1.12276C1.77006 1.12276 0.142822 2.79687 0.142822 5.16741ZM1.22095 5.16741C1.22095 3.38616 2.37273 2.20089 3.92630 2.20089C5.18523 2.20089 5.90842 2.98437 6.33699 3.65401C6.51779 3.92187 6.63168 3.99553 6.79237 3.99553C6.95311 3.99553 7.05357 3.91517 7.24774 3.65401C7.70979 2.99776 8.40619 2.20089 9.65842 2.20089C11.212 2.20089 12.3638 3.38616 12.3638 5.16741C12.3638 7.65845 9.73208 10.3438 6.93299 12.2054C6.86602 12.2522 6.81917 12.2857 6.79237 12.2857C6.76557 12.2857 6.71871 12.2522 6.65842 12.2054C3.85265 10.3438 1.22095 7.65845 1.22095 5.16741Z" fill="currentColor" />
              </g>
              <defs>
                <clipPath id="clip0_2002_42">
                  <rect width="13.2991" height="12.7031" fill="white" transform="translate(0.142822 0.714287)" />
                </clipPath>
              </defs>
            </svg>
            {wishlistCount > 0 && (
              <span className={styles.wishlistCount}>{wishlistCount}</span>
            )}
          </Link>
          <button className={styles.iconButton} onClick={handleUserClick}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2002_46)">
                <path d="M1.92639 13.1161H10.3438C11.4554 13.1161 11.9845 12.7813 11.9845 12.0446C11.9845 10.2902 9.76794 7.75223 6.13845 7.75223C2.50229 7.75223 0.285767 10.2902 0.285767 12.0446C0.285767 12.7813 0.814784 13.1161 1.92639 13.1161ZM1.61166 12.1049C1.43755 12.1049 1.36389 12.0581 1.36389 11.9174C1.36389 10.8125 3.06478 8.76337 6.13845 8.76337C9.20542 8.76337 10.9063 10.8125 10.9063 11.9174C10.9063 12.0581 10.8394 12.1049 10.6653 12.1049H1.61166ZM6.13845 6.9152C7.73217 6.9152 9.03131 5.50224 9.03131 3.77456C9.03131 2.06027 7.73891 0.714287 6.13845 0.714287C4.55139 0.714287 3.24559 2.08705 3.24559 3.78795C3.24559 5.50893 4.54469 6.9152 6.13845 6.9152ZM6.13845 5.90402C5.16077 5.90402 4.32372 4.97321 4.32372 3.78795C4.32372 2.62277 5.14737 1.72545 6.13845 1.72545C7.13622 1.72545 7.9532 2.60268 7.9532 3.77456C7.9532 4.95982 7.1228 5.90402 6.13845 5.90402Z" fill="currentColor" />
              </g>
              <defs>
                <clipPath id="clip0_2002_46">
                  <rect width="11.6987" height="12.4085" fill="white" transform="translate(0.285767 0.714287)" />
                </clipPath>
              </defs>
            </svg>
            {isAuthenticated && (
              <div className={styles.userIndicator}>
                <div className={styles.userDot}></div>
              </div>
            )}
          </button>
          <a href="/cart" className={styles.cartButton}>
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.38845 13.6161H10.2702C11.4688 13.6161 12.1719 12.9197 12.1719 11.5402V4.60938C12.1719 3.22991 11.4621 2.53348 10.0693 2.53348H2.38845C0.988892 2.53348 0.285767 3.22321 0.285767 4.60938V11.5402C0.285767 12.9263 0.988892 13.6161 2.38845 13.6161ZM2.40184 12.5379C1.7322 12.5379 1.36389 12.183 1.36389 11.4866V4.66295C1.36389 3.96652 1.7322 3.61161 2.40184 3.61161H10.0491C10.7121 3.61161 11.0938 3.96652 11.0938 4.66295V11.4866C11.0938 12.183 10.7121 12.5379 10.2501 12.5379H2.40184ZM3.5871 2.79464L4.66523 2.80134C4.66523 1.84375 5.29469 1.16072 6.22548 1.16072C7.15628 1.16072 7.79245 1.84375 7.79245 2.80134L8.87057 2.79464C8.87057 1.31473 7.72548 0.14286 6.22548 0.14286C4.7255 0.14286 3.5871 1.31473 3.5871 2.79464Z" fill="currentColor" />
            </svg>
            <span className={styles.cartCount}>{cartCount}</span>
          </a>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </header>
  );
} 