'use client';

import { useState } from 'react';
import CatalogHeader from '../../components/CatalogHeader';
import CatalogNavigation from '../../components/CatalogNavigation';
import PlatformSection from '../../components/PlatformSection';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

interface Store {
  id: number;
  name: string;
  description: string;
  rating: number;
  purchases: number;
  tags: string[];
  logo?: string;
  isFeatured?: boolean;
}

const featuredStores: Store[] = [
  {
    id: 1,
    name: "Exclusive Safi",
    description: "Авторские аксессуары из Дубая",
    rating: 4.9,
    purchases: 200,
    tags: ["Топ магазин", "Одежда", "Сувениры", "Картины"],
    isFeatured: true
  },
  {
    id: 2,
    name: "Trendy Oasis",
    description: "Уникальные аксессуары",
    rating: 4.8,
    purchases: 150,
    tags: ["Популярный выбор", "Ювелирные изделия", "Модная одежда", "Сумки"],
    isFeatured: true
  },
  {
    id: 3,
    name: "Chic Bazaar",
    description: "Эко-дизайн",
    rating: 4.7,
    purchases: 180,
    tags: ["Избранные товары", "Аксессуары", "Мебель", "Предметы интерьера"],
    isFeatured: true
  },
  {
    id: 4,
    name: "Artisan Roots",
    description: "Ручные изделия из Бали",
    rating: 5.0,
    purchases: 300,
    tags: ["Лидер продаж", "Керамика", "Текстиль", "Декор"],
    isFeatured: true
  }
];

const allStores: Store[] = [
  {
    id: 5,
    name: "Urban",
    description: "Современная мода",
    rating: 4.7,
    purchases: 150,
    tags: ["Новый магазин", "Одежда", "Аксессуары", "Коврики"]
  },
  {
    id: 6,
    name: "Artisan Delights",
    description: "Ручные изделия с душой",
    rating: 4.8,
    purchases: 300,
    tags: ["Новый магазин", "Кулинария", "Сувениры", "Копсульные коллекции"]
  },
  {
    id: 7,
    name: "Safi Collection",
    description: "Эксклюзивные аксессуары из Дубая",
    rating: 4.8,
    purchases: 250,
    tags: ["Мода", "Подарки", "Искусство"]
  },
  {
    id: 8,
    name: "Elegance Essentials",
    description: "Стильные предметы интерьера",
    rating: 4.5,
    purchases: 180,
    tags: ["Интерьер", "Декор", "Уют"]
  },
  {
    id: 9,
    name: "Trendy",
    description: "Современные гаджеты и устройства",
    rating: 4.7,
    purchases: 320,
    tags: ["Технологии", "Устройство", "Инновации"]
  },
  {
    id: 10,
    name: "Artisan Spices",
    description: "Редкие специи со всего мира",
    rating: 4.9,
    purchases: 150,
    tags: ["Кулинария", "Специи", "Вкусы"]
  },
  {
    id: 11,
    name: "Chic Jewelry",
    description: "Индивидуальные ювелирные изделия",
    rating: 5.0,
    purchases: 400,
    tags: ["Новый магазин", "Ювелирные изделия", "Элегантность", "Стиль"]
  },
  {
    id: 12,
    name: "Crafted Leather",
    description: "Ручные изделия из кожи",
    rating: 4.6,
    purchases: 275,
    tags: ["Аксессуары", "Кожа", "Качество"]
  },
  {
    id: 13,
    name: "Eco-Friendly Cotton",
    description: "Эко-дружественный хлопок",
    rating: 4.8,
    purchases: 150,
    tags: ["Одежда", "Хлопок", "Комфорт"]
  },
  {
    id: 14,
    name: "Organic",
    description: "Органический бамбук",
    rating: 4.7,
    purchases: 200,
    tags: ["Текстиль", "Экологичность"]
  },
  {
    id: 15,
    name: "Handmade Ceramics",
    description: "Ручная керамика",
    rating: 4.5,
    purchases: 320,
    tags: ["Домашний декор", "Керамика", "Индивидуальность"]
  },
  {
    id: 16,
    name: "Sustainable Wood",
    description: "Устойчивое дерево",
    rating: 4.9,
    purchases: 400,
    tags: ["Мебель", "Дерево", "Долговечность"]
  }
];

export default function StoresPage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className={styles.main}>
      <CatalogHeader />
      <CatalogNavigation />
      
      <div className={styles.content}>
        <h1 className={styles.title}>Магазины</h1>
        
        <section className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>Избранные</h2>
          <div className={styles.storesGrid}>
            {featuredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        <section className={styles.allStoresSection}>
          <h2 className={styles.sectionTitle}>Все магазины</h2>
          <div className={styles.storesGrid}>
            {allStores.slice(0, showMore ? allStores.length : 12).map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
          
          {!showMore && (
            <button 
              className={styles.showMoreButton}
              onClick={() => setShowMore(true)}
            >
              Показать больше
            </button>
          )}
                 </section>
       </div>
       
       <PlatformSection />
       <AtlasFooter />
    </main>
  );
}

function StoreCard({ store }: { store: Store }) {
  return (
    <div className={`${styles.storeCard} ${store.isFeatured ? styles.featured : ''}`}>
      <div className={styles.storeHeader}>
        <div className={styles.storeInfo}>
          <h3 className={styles.storeName}>{store.name}</h3>
          <p className={styles.storeDescription}>{store.description}</p>
        </div>
        <div className={styles.storeLogo}>
          {store.logo ? (
            <img src={store.logo} alt={store.name} />
          ) : (
            <div className={styles.logoPlaceholder}></div>
          )}
        </div>
      </div>
      
      <div className={styles.storeStats}>
        <div className={styles.rating}>
          <span className={styles.ratingValue}>{store.rating}</span>
          <span className={styles.ratingLabel}>Рейтинг магазина</span>
        </div>
        <div className={styles.purchases}>
          <span className={styles.purchasesValue}>+{store.purchases}</span>
          <span className={styles.purchasesLabel}>Кол-во покупок</span>
        </div>
      </div>
      
             <div className={styles.storeTags}>
         {store.tags.map((tag, index) => (
           <span key={index} className={`${styles.tag} ${index === 0 ? styles.firstTag : ''} ${!store.isFeatured ? styles.allStoresTag : ''} ${tag === 'Новый магазин' ? styles.newStoreTag : ''}`}>{tag}</span>
         ))}
       </div>
      
      <button className={styles.visitButton}>
        {store.isFeatured ? 'Перейти к магазину' : 'Посетить магазин'}
      </button>
    </div>
  );
} 