'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import CatalogHeader from '../../components/CatalogHeader';
import CheckoutSteps from '../../components/CheckoutSteps';
import CheckoutSummary from '../../components/CheckoutSummary';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { isAuthenticated, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribeToEmails, setSubscribeToEmails] = useState(true);

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const token = localStorage.getItem('atlas_token');
        if (token) {
          const response = await fetch('https://test.devdenis.ru/wp-json/atlas/v1/cart/with-categories', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              console.log('Данные корзины:', data);
              console.log('total_price_numeric:', data.total_price_numeric);
              
              // Преобразуем данные корзины в формат для чекаута
              const items = data.cart.map((item: any) => {
                const price = parseFloat(item.price) * 1000;
                console.log(`Товар ${item.name}: цена ${item.price} -> ${price}`);
                return {
                  id: item.product_id,
                  name: item.name,
                  price: price,
                  image: item.image,
                  quantity: item.quantity
                };
              });
              
              setCartItems(items);
              const totalPrice = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
              console.log('Итоговая сумма:', totalPrice);
              setTotal(totalPrice);
            }
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
      } finally {
        setLoadingCart(false);
      }
    };

    if (isAuthenticated) {
      loadCart();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.checkoutContainer}>
          <div className={styles.loading}>Загрузка...</div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.checkoutContainer}>
          <div className={styles.error}>
            <h2>Необходимо войти в аккаунт</h2>
            <p>Для оформления заказа необходимо авторизоваться</p>
            <a href="/login" className={styles.loginBtn}>
              Войти в аккаунт
            </a>
          </div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  if (loadingCart) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.checkoutContainer}>
          <div className={styles.loading}>Загрузка корзины...</div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.checkoutContainer}>
          <div className={styles.error}>
            <h2>Корзина пуста</h2>
            <p>Для оформления заказа добавьте товары в корзину</p>
            <a href="/catalog" className={styles.loginBtn}>
              Перейти в каталог
            </a>
          </div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <CatalogHeader />
      <div className={styles.checkoutContainer}>
        <CheckoutSteps 
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          email={email}
          setEmail={setEmail}
          subscribeToEmails={subscribeToEmails}
          setSubscribeToEmails={setSubscribeToEmails}
        />
        <CheckoutSummary 
          cartItems={cartItems}
          total={total}
        />
      </div>
      <AtlasFooter />
    </main>
  );
} 