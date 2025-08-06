'use client';

import { useRouter } from 'next/navigation';
import CatalogHeader from '../../components/CatalogHeader';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function NavigationPage() {
  const router = useRouter();

  const pages = [
    { path: '/', name: 'Главная страница', description: 'Домашняя страница с основным контентом' },
    { path: '/catalog', name: 'Каталог', description: 'Страница с товарами и фильтрами' },
    { path: '/product/1', name: 'Страница товара', description: 'Детальная информация о товаре' },
    { path: '/cart', name: 'Корзина', description: 'Страница корзины с товарами' },
    { path: '/checkout', name: 'Оформление заказа', description: 'Страница оформления покупки' },
    { path: '/profile', name: 'Профиль', description: 'Личный кабинет пользователя' },
    { path: '/review', name: 'Оставить отзыв', description: 'Страница для написания отзыва' },
    { path: '/stores', name: 'Магазины', description: 'Информация о магазинах' },
    { path: '/seller-registration', name: 'Регистрация продавца', description: 'Пошаговая регистрация продавца' }
  ];

  const handlePageClick = (path: string) => {
    router.push(path);
  };

  return (
    <main className={styles.main}>
      <CatalogHeader />
      
      <div className={styles.content}>
        <h1 className={styles.title}>Навигация по страницам</h1>
        <p className={styles.subtitle}>Выберите страницу для перехода:</p>
        
        <div className={styles.pagesGrid}>
          {pages.map((page, index) => (
            <div 
              key={index} 
              className={styles.pageCard}
              onClick={() => handlePageClick(page.path)}
            >
              <h2 className={styles.pageName}>{page.name}</h2>
              <p className={styles.pageDescription}>{page.description}</p>
              <div className={styles.pagePath}>{page.path}</div>
              <div className={styles.clickHint}>Нажмите для перехода</div>
            </div>
          ))}
        </div>
      </div>

      <AtlasFooter />
    </main>
  );
} 