'use client';

import { useState } from 'react';
import styles from './PartnersSection.module.css';

export default function PartnersSection() {
  const partners = [
    {
      name: "Exclusive Safi",
      description: "Авторские аксессуары из Дубая",
      rating: "4.9",
      purchases: "+200",
      image: "/part_1.png"
    },
    {
      name: "Exclusive Safi",
      description: "Авторские аксессуары из Дубая",
      rating: "4.9",
      purchases: "+200",
      image: "/part_1.png"
    },
    {
      name: "Exclusive Safi",
      description: "Авторские аксессуары из Дубая",
      rating: "4.9",
      purchases: "+200",
      image: "/part_1.png"
    },
    {
      name: "Exclusive Safi",
      description: "Авторские аксессуары из Дубая",
      rating: "4.9",
      purchases: "+200",
      image: "/part_1.png"
    },
    {
      name: "Exclusive Safi",
      description: "Авторские аксессуары из Дубая",
      rating: "4.9",
      purchases: "+200",
      image: "/part_1.png"
    },
    {
      name: "Exclusive Safi",
      description: "Авторские аксессуары из Дубая",
      rating: "4.9",
      purchases: "+200",
      image: "/part_1.png"
    },
    {
      name: "Exclusive Safi",
      description: "Авторские аксессуары из Дубая",
      rating: "4.9",
      purchases: "+200",
      image: "/part_1.png"
    },
    {
      name: "Exclusive Safi",
      description: "Авторские аксессуары из Дубая",
      rating: "4.9",
      purchases: "+200",
      image: "/part_1.png"
    }
  ];

  return (
    <section className={styles.partners}>
      <div className={styles.header}>
        <h2 className={styles.title}>Наши избранные партнёры</h2>
        <p className={styles.subtitle}>
          Каждый бренд здесь — часть нашей философии качества, вкуса и смысла.
        </p>
      </div>
      
      {/* Десктопная версия */}
      <div className={styles.partnersGrid}>
        {partners.map((partner, index) => (
          <div key={index} className={styles.partnerCard}>
            <div className={styles.partnerLogo}>
              <img src={partner.image} alt={partner.name} />
            </div>
            <h3 className={styles.partnerName}>{partner.name}</h3>
            <p className={styles.partnerDescription}>{partner.description}</p>
            <div className={styles.partnerStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{partner.rating}</span>
                <span className={styles.statLabel}>Рейтинг магазина</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{partner.purchases}</span>
                <span className={styles.statLabel}>Кол-во покупок</span>
              </div>
            </div>
            <a href="#" className={styles.partnerLink}>Перейти к магазину</a>
          </div>
        ))}
      </div>

      {/* Мобильная версия - слайдер */}
      <div className={styles.mobileSlider}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack}>
            {partners.map((partner, index) => (
              <div key={index} className={styles.partnerCard}>
                <div className={styles.partnerLogo}>
                  <img src={partner.image} alt={partner.name} />
                </div>
                <h3 className={styles.partnerName}>{partner.name}</h3>
                <p className={styles.partnerDescription}>{partner.description}</p>
                <div className={styles.partnerStats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{partner.rating}</span>
                    <span className={styles.statLabel}>Рейтинг магазина</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{partner.purchases}</span>
                    <span className={styles.statLabel}>Кол-во покупок</span>
                  </div>
                </div>
                <a href="#" className={styles.partnerLink}>Перейти к магазину</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 