'use client';

import { useState } from 'react';
import styles from './ProductDetail.module.css';
import Toast from './Toast';

interface ProductDetailProps {
  productId: string;
}

interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('XS');
  const [selectedColor, setSelectedColor] = useState('Серый');
  const [isFavorite, setIsFavorite] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const product = {
    id: productId,
    sku: "1ABOF2",
    name: "Dubai Umbrella Abaya Samiha Gray",
    price: "₸ 240 000",
    store: "NEYSS",
    images: ["/product_1.png", "/product_1.png", "/product_1.png", "/product_1.png"],
    colors: [
      { name: "Серый", image: "/product_1.png" },
      { name: "Черный", image: "/product_1.png" },
      { name: "Бежевый", image: "/product_1.png" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    deliveryGeography: "По всему Казахстану",
    deliveryOptions: [
      "Сегодня",
      "Завтра", 
      "До 2 дней",
      "До 5 дней",
      "До 7 дней"
    ],
    deliveryNote: "Вы можете выбрать срок получения после добавления в корзину"
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setToast({
      isVisible: true,
      message: !isFavorite ? 'Товар добавлен в избранное' : 'Товар удален из избранного',
      type: 'success'
    });
  };

  const addToCart = () => {
    setToast({
      isVisible: true,
      message: 'Товар добавлен в корзину',
      type: 'success'
    });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <>
      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img src={product.images[0]} alt={product.name} />
            </div>
            <div className={styles.additionalImages}>
              {product.images.slice(1).map((image, index) => (
                <div key={index} className={styles.additionalImage}>
                  <img src={image} alt={`${product.name} ${index + 2}`} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.productHeader}>
              <div className={styles.productInfo}>
                <div className={styles.sku}>{product.sku}</div>
                <h1 className={styles.productName}>АБАЙЯ</h1>
                <h2 className={styles.productTitle}>{product.name}</h2>
                <div className={styles.price}>{product.price}</div>
              </div>
              <button className={styles.favoriteButton} onClick={toggleFavorite}>
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                    fill={isFavorite ? "#ff4757" : "transparent"} 
                    stroke={isFavorite ? "#ff4757" : "#333"} 
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.colorsSection}>
              <h3 className={styles.sectionTitle}>Цвета               <div className={styles.selectedColor}>{selectedColor}</div>
              </h3>
              
              <div className={styles.colorThumbnails}>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`${styles.colorThumbnail} ${selectedColor === color.name ? styles.selected : ''}`}
                    onClick={() => setSelectedColor(color.name)}
                  >
                    <img src={color.image} alt={color.name} />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.sizeSection}>
              <h3 className={styles.sectionTitle}>Размеры</h3>
              <div className={styles.sizeDropdown}>
                <span className={styles.selectedSize}>{selectedSize}</span>
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 5L11 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className={styles.deliverySection}>
              <h3 className={styles.sectionTitle}>География доставки</h3>
              <p className={styles.deliveryGeography}>{product.deliveryGeography}</p>
              
              <h3 className={styles.sectionTitle}>Срок получения</h3>
              <div className={styles.deliveryOptions}>
                {product.deliveryOptions.map((option, index) => (
                  <span key={index} className={styles.deliveryOption}>
                    {option}
                    {index < product.deliveryOptions.length - 1 && <span className={styles.separator}>/</span>}
                  </span>
                ))}
              </div>
              <p className={styles.deliveryNote}>{product.deliveryNote}</p>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.addToCartButton} onClick={addToCart}>
                Добавить в корзину
              </button>
            </div>

            <div className={styles.storeInfo}>
              <p className={styles.store}>Товар от магазина {product.store}</p>
              <p className={styles.delivery}>Оплата и доставка - напрямую</p>
            </div>

            <div className={styles.collapsibleSection}>
              <h3 className={styles.sectionTitle}>
                Описание
                <span className={styles.expandIcon}>+</span>
              </h3>
            </div>

            <div className={styles.collapsibleSection}>
              <h3 className={styles.sectionTitle}>
                Характеристики
                <span className={styles.expandIcon}>+</span>
              </h3>
            </div>
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