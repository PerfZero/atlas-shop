'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CatalogHeader from '../../components/CatalogHeader';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function OrderSuccessPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('orderId');
    if (id) {
      setOrderId(id);
    }
  }, []);

  const handleContinueShopping = () => {
    router.push('/catalog');
  };

  const handleViewOrders = () => {
    router.push('/profile?tab=purchases');
  };

  return (
    <main className={styles.main}>
      <CatalogHeader />
      
      <div className={styles.content}>
        <div className={styles.successCard}>
                     <div className={styles.successIcon}>
             <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="40" cy="40" r="40" fill="var(--labels-primary)"/>
               <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </div>
          
          <h1 className={styles.title}>Заказ успешно оформлен!</h1>
          
          <p className={styles.message}>
            Спасибо за ваш заказ. Мы получили вашу заявку и обработаем её в ближайшее время.
          </p>
          
          {orderId && (
            <div className={styles.orderInfo}>
              <p className={styles.orderLabel}>Номер заказа:</p>
              <p className={styles.orderNumber}>{orderId}</p>
            </div>
          )}
          
          <div className={styles.infoBox}>
            <h3 className={styles.infoTitle}>Что дальше?</h3>
            <ul className={styles.infoList}>
              <li>Мы отправим вам SMS с подтверждением заказа</li>
              <li>Наш менеджер свяжется с вами для уточнения деталей</li>
              <li>Вы можете отслеживать статус заказа в личном кабинете</li>
            </ul>
          </div>
          
          <div className={styles.actions}>
            <button className={styles.primaryButton} onClick={handleContinueShopping}>
              Продолжить покупки
            </button>
            <button className={styles.secondaryButton} onClick={handleViewOrders}>
              Мои заказы
            </button>
          </div>
        </div>
      </div>
      
      <AtlasFooter />
    </main>
  );
} 