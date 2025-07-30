'use client';

import { useEffect, useRef } from 'react';
import styles from './LiquidGlassHeader.module.css';

export default function LiquidGlassHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      header.style.cursor = 'grabbing';
      header.style.animationPlayState = 'paused';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      
      header.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      header.style.cursor = 'grab';
      header.style.animationPlayState = 'running';
    };

    header.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      header.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className={styles.liquidGlassHeader}>
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

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="displacementFilter">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.001" 
              numOctaves="3" 
              result="turbulence" 
              seed="1"
            />
            <feDisplacementMap 
              in="SourceGraphic"
              in2="turbulence"    
              scale="150" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}