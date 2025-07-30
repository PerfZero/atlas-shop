'use client';

import { useEffect, useRef } from 'react';
import styles from './LiquidGlassCard.module.css';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  disableDrag?: boolean;
}

export default function LiquidGlassCard({ children, disableDrag = false }: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || disableDrag) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      card.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      
      card.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      card.style.cursor = 'grab';
    };

    card.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      card.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={cardRef} className={styles.card}>
        {children}
      </div>

      <svg style={{ display: 'none' }}>
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.7"
            numOctaves="1"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  );
}