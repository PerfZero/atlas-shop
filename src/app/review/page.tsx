'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CatalogHeader from '../../components/CatalogHeader';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function ReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const product = {
    name: "NOMADMOOD ASAR UME STYLE",
    article: "1ABOF4",
    image: "/pic_1.png",
    store: "Nysse"
  };

  const handleRatingClick = (star: number) => {
    setRating(star);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Отзыв отправлен:', { rating, reviewText });
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={styles.main}>
      <CatalogHeader />
      
      <h1 className={styles.reviewTitle}>Отзыв</h1>
      
      <div className={styles.content}>
        <div className={styles.reviewLayout}>
          <div className={styles.leftColumn}>
            <form className={styles.reviewForm} onSubmit={handleSubmit}>
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Опишите ваш опыт</h2>
                <div className={styles.formFields}>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Имя *</label>
                  <input 
                    type="text" 
                    className={styles.textInput}
                    value="Айдана"
                    readOnly
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Оцените товар *</label>
                  <div className={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`${styles.starButton} ${star <= rating ? styles.filled : ''}`}
                        onClick={() => handleRatingClick(star)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            fill={star <= rating ? "#000" : "transparent"}
                            stroke="#000"
                            strokeWidth="1"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Описание *</label>
                  <textarea
                    className={styles.reviewTextarea}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Опишите опыт использования"
                    rows={6}
                    required
                  />
                </div>

                <div className={styles.requiredFields}>* Обязательные поля</div>
                <button type="submit" className={styles.submitButton}>
                  Оставить отзыв
                </button>   
                </div>
                
              </div>
            </form>
          </div>

          <div className={styles.rightColumn}>
            <h2 className={styles.productTitle}>Отзыв о товаре:</h2>
            <div className={styles.orderWrapper}>
            <div className={styles.orderItem}>
              <div className={styles.orderImage}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.orderDetails}>
                <div className={styles.orderNameArticlePrice}>
                  <h3 className={styles.orderName}>{product.name}</h3>
                  <div className={styles.orderArticle}>{product.article}</div>
                  <div className={styles.orderPrice}>19 690 ₸</div>
                </div>
                <div className={styles.orderSpecs}>
                  <div className={styles.orderSpec}>
                    <span className={styles.specLabel}>Цвет:</span>
                    <span className={styles.specValue}>Белый</span>
                  </div>
                  <div className={styles.orderSpec}>
                    <span className={styles.specLabel}>Размер:</span>
                    <span className={styles.specValue}>XL</span>
                  </div>
                  <div className={styles.orderSpec}>
                    <span className={styles.specLabel}>Доставлено:</span>
                    <span className={styles.specValue}>12.09.2025</span>
                  </div>
                </div>
                <div className={styles.orderActions}>
                  <button className={styles.orderAction}>Открыть товар</button>
                  <button className={styles.orderAction}>Заказать еще</button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className={styles.contactBlock}>
          <h2 className={styles.blockTitle}>СВЯЖИТЕСЬ С НАМИ</h2>
          <div className={styles.contactInfo}>
            <p className={styles.contactText}>
              Наша команда поддержки клиентов поможет вам
            </p>
            <button type="button" className={styles.contactButton}>
              Связаться с нами
            </button>
          </div>
        </div>
      </div>

      <AtlasFooter />
    </main>
  );
} 