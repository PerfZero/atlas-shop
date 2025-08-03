'use client';

import { useState } from 'react';
import styles from './RelatedProducts.module.css';
import Toast from './Toast';

interface Product {
  id: number;
  name: string;
  price: string;
  store: string;
  image: string;
  isFavorite: boolean;
}

interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function RelatedProducts() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Dubai Umbrella Abaya Samiha Black",
      price: "₸ 220 000",
      store: "NEYSS",
      image: "/product_1.png",
      isFavorite: false
    },
    {
      id: 2,
      name: "Dubai Umbrella Abaya Samiha White",
      price: "₸ 220 000",
      store: "NEYSS",
      image: "/product_1.png",
      isFavorite: false
    },
    {
      id: 3,
      name: "Dubai Umbrella Abaya Samiha Blue",
      price: "₸ 220 000",
      store: "NEYSS",
      image: "/product_1.png",
      isFavorite: false
    },
    {
      id: 4,
      name: "Dubai Umbrella Abaya Samiha Red",
      price: "₸ 220 000",
      store: "NEYSS",
      image: "/product_1.png",
      isFavorite: false
    }
  ]);

  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const toggleFavorite = (productId: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );

    const product = products.find(p => p.id === productId);
    const isFavorite = !product?.isFavorite;

    setToast({
      isVisible: true,
      message: isFavorite 
        ? 'Товар добавлен в избранное' 
        : 'Товар удален из избранного',
      type: 'success'
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <>
      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Похожие товары</h2>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                  <button 
                    className={`${styles.heartButton} ${product.isFavorite ? styles.active : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M10 17.25L8.55 15.925C4.4 12.25 1.5 9.65 1.5 6.5C1.5 3.95 3.45 2 6 2C7.2 2 8.35 2.45 9.25 3.25L10 4L10.75 3.25C11.65 2.45 12.8 2 14 2C16.55 2 18.5 3.95 18.5 6.5C18.5 9.65 15.6 12.25 11.45 15.925L10 17.25Z" 
                        fill={product.isFavorite ? "#ff4757" : "transparent"} 
                        stroke={product.isFavorite ? "#ff4757" : "#333"} 
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>{product.price}</p>
                  <p className={styles.productStore}>Товар от магазина {product.store}</p>
                  <p className={styles.productDelivery}>Оплата и доставка -- напрямую</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </>
  );
} 