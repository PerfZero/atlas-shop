'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { WordPressAPI } from '../../services/wordpressApi';
import CatalogHeader from '../../components/CatalogHeader';
import AtlasFooter from '../../components/AtlasFooter';
import Toast from '../../components/Toast';
import styles from './page.module.css';

export default function ReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, loading } = useAuth();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [product, setProduct] = useState<any>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'info',
    isVisible: false
  });

  // Проверяем авторизацию
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [loading, isAuthenticated, router]);

  // Загружаем данные товара
  useEffect(() => {
    const loadProduct = async () => {
      const productId = searchParams.get('product_id');
      if (!productId) {
        router.push('/profile');
        return;
      }

      try {
        const response = await fetch(`https://test.devdenis.ru/wp-json/atlas/v1/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setProduct(data.product);
          } else {
            showToast('Ошибка загрузки товара', 'error');
            router.push('/profile');
          }
        } else {
          showToast('Ошибка загрузки товара', 'error');
          router.push('/profile');
        }
      } catch (error) {
        console.error('Ошибка загрузки товара:', error);
        showToast('Ошибка загрузки товара', 'error');
        router.push('/profile');
      } finally {
        setLoadingProduct(false);
      }
    };

    if (isAuthenticated) {
      loadProduct();
    }
  }, [isAuthenticated, searchParams, router]);

  const handleRatingClick = (star: number) => {
    setRating(star);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      showToast('Пожалуйста, поставьте оценку', 'error');
      return;
    }

    if (!reviewText.trim()) {
      showToast('Пожалуйста, напишите отзыв', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const token = WordPressAPI.getSavedToken();
      const productId = searchParams.get('product_id');
      
      if (!token || !productId) {
        showToast('Ошибка отправки отзыва', 'error');
        return;
      }

      const result = await WordPressAPI.addReview(token, parseInt(productId), rating, reviewText);
      
      if (result.success) {
        showToast('Отзыв успешно добавлен!', 'success');
        setTimeout(() => {
          router.push('/profile?tab=reviews');
        }, 1500);
      } else {
        showToast(result.message || 'Ошибка отправки отзыва', 'error');
      }
    } catch (error) {
      console.error('Ошибка отправки отзыва:', error);
      showToast('Ошибка отправки отзыва', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({
      message,
      type,
      isVisible: true
    });
  };

  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  // Показываем загрузку
  if (loading || loadingProduct) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка...</p>
        </div>
      </main>
    );
  }

  // Если не авторизован, не показываем контент
  if (!isAuthenticated) {
    return null;
  }

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
                    value={user?.firstName || user?.phone || 'Пользователь'}
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
                <button type="submit" className={styles.submitButton} disabled={submitting}>
                  {submitting ? 'Отправка...' : 'Оставить отзыв'}
                </button>   
                </div>
                
              </div>
            </form>
          </div>

                       <div className={styles.rightColumn}>
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Отзыв о товаре:</h2>
                {product ? (
                  <div className={styles.orderWrapper}>
                  <div className={styles.orderItem}>
                    <div className={styles.orderImage}>
                      <img alt="Product" src={product.image || "/pic_1.png"} />
                    </div>
                    <div className={styles.orderDetails}>
                      <div className={styles.orderNameArticlePrice}>
                        <h3 className={styles.orderName}>{product.name}</h3>
                        <div className={styles.orderArticle}>{product.sku}</div>
                        <div className={styles.orderPrice}>{product.price}</div>
                      </div>
                                             <div className={styles.orderSpecs}>
                         {product.attributes?.colors?.[0]?.name && (
                           <div className={styles.orderSpec}>
                             <span className={styles.specLabel}>Цвет:</span>
                             <span className={styles.specValue}>{product.attributes.colors[0].name}</span>
                           </div>
                         )}
                         {product.attributes?.sizes?.[0]?.name && (
                           <div className={styles.orderSpec}>
                             <span className={styles.specLabel}>Размер:</span>
                             <span className={styles.specValue}>{product.attributes.sizes[0].name}</span>
                           </div>
                         )}
                         <div className={styles.orderSpec}>
                           <span className={styles.specLabel}>Магазин:</span>
                           <span className={styles.specValue}>{product.store || 'Atlas Store'}</span>
                         </div>
                       </div>
                      <div className={styles.orderActions}>
                        <button className={styles.orderAction}>Открыть товар</button>
                        <button className={styles.orderAction}>Заказать еще</button>
                      </div>
                    </div>
                  </div>
                  </div>
                пш) : (
                  <div className={styles.loading}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Загрузка товара...</p>
                  </div>
                )}
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
       
       <Toast 
         message={toast.message}
         type={toast.type}
         isVisible={toast.isVisible}
         onClose={hideToast}
       />
     </main>
   );
 } 