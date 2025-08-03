'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CatalogHeader from '../../components/CatalogHeader';
import ProductGrid from '../../components/ProductGrid';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [searchRegion, setSearchRegion] = useState('');

  const cities = [
    "Тараз",
    "Талдыкорган", 
    "Алматы",
    "Астана",
    "Шымкент",
    "Семей",
    "Кызылорда",
    "Актау",
    "Атырау"
  ];

  const regions = [
    "Бостандыкский",
    "Алмалинский",
    "Медеуский",
    "Турксибский",
    "Жетысуский",
    "Ауэзовский"
  ];

  const wishlistProducts = [
    {
      id: 1,
      name: "Dubai Umbrella Abaya Samiha Gray",
      price: "〒240 000",
      store: "NEYSS",
      image: "/pic_1.png",
      isFavorite: true
    },
    {
      id: 2,
      name: "Dubai Umbrella Abaya Samiha Gray",
      price: "〒240 000",
      store: "NEYSS",
      image: "/pic_2.png",
      isFavorite: true
    },
    {
      id: 3,
      name: "Dubai Umbrella Abaya Samiha Gray",
      price: "〒240 000",
      store: "NEYSS",
      image: "/pic_3.png",
      isFavorite: true
    },
    {
      id: 4,
      name: "Dubai Umbrella Abaya Samiha Gray",
      price: "〒240 000",
      store: "NEYSS",
      image: "/pic_4.png",
      isFavorite: true
    }
  ];

  const reviews = [
    {
      id: 1,
      productName: "NOMADMOOD ASAR UME STYLE",
      article: "1ABOF4",
      date: "16.07.2025",
      rating: 5,
      store: "Nysse",
      image: "/pic_1.png",
      text: "Я в полном восторге от своей новой абайи, которую купила в магазине Atlas Store! Она не только невероятно стильная, но и очень удобная. Материал легкий и дышащий, что делает её идеальной для повседневной носки. Я чувствую себя уверенно и элегантно в ней, и не могу дождаться, чтобы показать её своим друзьям!"
    },
    {
      id: 2,
      productName: "NOMADMOOD ASAR UME STYLE",
      article: "1ABOF4",
      date: "16.07.2025",
      rating: 4,
      store: "Nysse",
      image: "/pic_2.png",
      text: "Каждый раз, когда я надеваю свою абайю от SoleMate, я чувствую себя особенной. Она прекрасно сидит и подчеркивает мою фигуру, а яркие детали делают её уникальной. Это отличный выбор для любого мероприятия, и я всегда получаю комплименты!"
    },
    {
      id: 3,
      productName: "NOMADMOOD ASAR UME STYLE",
      article: "1ABOF4",
      date: "16.07.2025",
      rating: 5,
      store: "Nysse",
      image: "/pic_3.png",
      text: "Потрясающая абайя! Сочетает традиционный стиль с современным дизайном. Ношу на работу и вечерние прогулки, всегда чувствую себя комфортно и стильно. Рекомендую всем, кто ищет что-то особенное."
    }
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchCity(city);
    setShowCityDropdown(false);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setSearchRegion(region);
    setShowRegionDropdown(false);
  };

  const handleReviewClick = () => {
    router.push('/review');
  };



  const tabs = [
    { id: 'general', label: 'Общее' },
    { id: 'profile', label: 'Мой профиль' },
    { id: 'purchases', label: 'Мои покупки' },
    { id: 'wishlist', label: 'Список желаемого' },
    { id: 'reviews', label: 'Мои отзывы' }
  ];

  return (
    <main className={styles.main}>
      <CatalogHeader />
      
      <div className={styles.pageHeader}>
        <div className={styles.pageTitle}>Личный кабинет</div>
        <nav className={styles.pageTabs}>
          {tabs.map((tab, index) => (
            <div key={tab.id} className={styles.tabContainer}>
              <button
                className={`${styles.pageTab} ${activeTab === tab.id ? styles.activePageTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
              {index < tabs.length - 1 && <div className={styles.tabSeparator}></div>}
            </div>
          ))}
        </nav>
      </div>
      
      {activeTab === 'general' && (
        <>
          <div className={styles.banner}>
            <div className={styles.bannerOverlay}></div>
          </div>

          <div className={styles.content}>
            <div className={styles.userSection}>
              <div className={styles.avatar}>
                <span>S.B.</span>
              </div>
              <h1 className={styles.userName}>Sattily Bro</h1>
            </div>

            <div className={styles.blocksContainer}>
              <div className={styles.leftColumn}>
                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>Мой профиль</h2>
                  <div className={styles.profileInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Номер телефона:</span>
                      <span className={styles.infoValue}>+7 777 777 77 77</span>
                    </div>
                    <button className={styles.editButton}>
                      Редактировать профиль
                    </button>
                  </div>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>СВЯЖИТЕСЬ С НАМИ</h2>
                  <div className={styles.contactInfo}>
                    <p className={styles.contactText}>
                      Наша команда поддержки клиентов поможет вам
                    </p>
                    <button className={styles.contactButton}>
                      Связаться с нами
                    </button> 
                  </div>
                </div>
              </div>

              <div className={styles.rightColumn}>
                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>Мои заказы</h2>
                  <div className={styles.ordersInfo}>
                    <p className={styles.noOrders}>Нет заказов</p>
                    <button className={styles.shopButton}>
                      К покупкам
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

             {activeTab === 'profile' && (
         <div className={styles.content}>
           <div className={styles.blocksContainer}>
                          <div className={styles.leftColumn}>
                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>Имя и адрес</h2>
                  <div className={styles.profileForm}>
                    <div className={styles.formField}>
                      <label>Имя *</label>
                      <input type="text" placeholder="Введите имя" />
                    </div>
                    <div className={styles.formField}>
                      <label>Фамилия *</label>
                      <input type="text" placeholder="Введите фамилию" />
                    </div>
                                       <div className={styles.formField}>
                       <label>Город *</label>
                       <div className={styles.selectWrapper}>
                                                 <input
                            type="text"
                            value={searchCity}
                            placeholder="Выберите"
                            className={styles.citySelect}
                            onChange={(e) => {
                              setSearchCity(e.target.value);
                              setShowCityDropdown(true);
                            }}
                            onFocus={() => setShowCityDropdown(true)}
                            onClick={(e) => e.stopPropagation()}
                          />
                         <div className={styles.selectArrow}>
                           <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </div>
                                                 {showCityDropdown && (
                            <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                              {cities
                                .filter(city => city.toLowerCase().includes(searchCity.toLowerCase()))
                                .map((city) => (
                                  <div
                                    key={city}
                                    className={styles.dropdownItem}
                                    onClick={() => handleCitySelect(city)}
                                  >
                                    {city}
                                  </div>
                                ))}
                            </div>
                          )}
                       </div>
                     </div>
                     <div className={styles.formField}>
                       <label>Район *</label>
                       <div className={styles.selectWrapper}>
                                                 <input
                            type="text"
                            value={searchRegion}
                            placeholder="Выберите"
                            className={styles.citySelect}
                            onChange={(e) => {
                              setSearchRegion(e.target.value);
                              setShowRegionDropdown(true);
                            }}
                            onFocus={() => setShowRegionDropdown(true)}
                            onClick={(e) => e.stopPropagation()}
                          />
                         <div className={styles.selectArrow}>
                           <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </div>
                                                 {showRegionDropdown && (
                            <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                              {regions
                                .filter(region => region.toLowerCase().includes(searchRegion.toLowerCase()))
                                .map((region) => (
                                  <div
                                    key={region}
                                    className={styles.dropdownItem}
                                    onClick={() => handleRegionSelect(region)}
                                  >
                                    {region}
                                  </div>
                                ))}
                            </div>
                          )}
                       </div>
                     </div>
                    <div className={styles.formField}>
                      <label>Индекс *</label>
                      <input type="text" placeholder="Введите индекс" />
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Улица *</label>
                        <input type="text" placeholder="Название улицы" />
                      </div>
                      <div className={styles.formField}>
                        <label>Номер дома *</label>
                        <input type="text" placeholder="Номер дома" />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label>Подъезд *</label>
                        <input type="text" placeholder="Номер подъезда" />
                      </div>
                      <div className={styles.formField}>
                        <label>Квартира *</label>
                        <input type="text" placeholder="Номер квартиры" />
                      </div>
                      <div className={styles.formField}>
                        <label>Домофон *</label>
                        <input type="text" placeholder="Номер домофона" />
                      </div>
                      <div className={styles.formField}>
                        <label>Этаж *</label>
                        <input type="text" placeholder="Номер этажа" />
                      </div>
                    </div>
                    <div className={styles.requiredFields}>* Обязательные поля</div>
                    <button className={styles.saveButton}>Сохранить</button>
                  </div>
                </div>

                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>СВЯЖИТЕСЬ С НАМИ</h2>
                  <div className={styles.contactInfo}>
                    <p className={styles.contactText}>
                      Наша команда поддержки клиентов поможет вам
                    </p>
                    <button className={styles.contactButton}>
                      Связаться с нами
                    </button> 
                  </div>
                </div>
              </div>

                                                    <div className={styles.rightColumn}>
                 <div className={styles.block}>
                   <h2 className={styles.blockTitle}>Контактные данные</h2>
                   <div className={styles.contactForm}>
                     <div className={styles.formField}>
                       <label>Номер телефона *</label>
                       <input type="tel" value="+7 777 777 77 77" readOnly />
                     </div>
                     <div className={styles.formField}>
                       <label>Адрес электронной почты</label>
                       <input type="email" placeholder="Введите адрес электронной почты" />
                     </div>
                     <button className={styles.saveButton}>Сохранить</button>
                   </div>
                 </div>
               </div>
           </div>
         </div>
       )}

       {activeTab === 'purchases' && (
         <div className={styles.content}>
           <div className={styles.blocksContainer}>
             <div className={styles.leftColumn}>
               <div className={styles.block}>
                 <h2 className={styles.blockTitle}>Текущие заказы</h2>
                 <div className={styles.ordersList}>
                   <div className={styles.orderItem}>
                     <div className={styles.orderImage}>
                       <img src="/pic_1.png" alt="Product" />
                     </div>
                                           <div className={styles.orderDetails}>
                        <div className={styles.orderNameArticlePrice}>
                          <h3 className={styles.orderName}>NOMADMOOD ASAR UME STYLE</h3>
                          <div className={styles.orderArticle}>1ABOF2</div>
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
                           <span className={styles.specLabel}>Доставка:</span>
                           <span className={styles.specValue}>12.09.2025</span>
                         </div>
                       </div>
                       <div className={styles.orderActions}>
                         <button className={styles.orderAction}>Открыть товар</button>
                         <button className={styles.orderAction}>Заказать еще</button>
                       </div>
                     </div>
                   </div>

                   <div className={styles.orderItem}>
                     <div className={styles.orderImage}>
                       <img src="/pic_2.png" alt="Product" />
                     </div>
                                           <div className={styles.orderDetails}>
                        <div className={styles.orderNameArticlePrice}>
                          <h3 className={styles.orderName}>NOMADMOOD ASAR UME STYLE</h3>
                          <div className={styles.orderArticle}>2CDEF3</div>
                          <div className={styles.orderPrice}>21 900 ₸</div>
                        </div>
                       <div className={styles.orderSpecs}>
                         <div className={styles.orderSpec}>
                           <span className={styles.specLabel}>Цвет:</span>
                           <span className={styles.specValue}>Черный</span>
                         </div>
                         <div className={styles.orderSpec}>
                           <span className={styles.specLabel}>Размер:</span>
                           <span className={styles.specValue}>L</span>
                         </div>
                         <div className={styles.orderSpec}>
                           <span className={styles.specLabel}>Доставка:</span>
                           <span className={styles.specValue}>15.09.2025</span>
                         </div>
                       </div>
                       <div className={styles.orderActions}>
                         <button className={styles.orderAction}>Открыть товар</button>
                         <button className={styles.orderAction}>Заказать еще</button>
                       </div>
                     </div>
                   </div>

                   <div className={styles.orderItem}>
                     <div className={styles.orderImage}>
                       <img src="/pic_3.png" alt="Product" />
                     </div>
                                           <div className={styles.orderDetails}>
                        <div className={styles.orderNameArticlePrice}>
                          <h3 className={styles.orderName}>NOMADMOOD ASAR UME STYLE</h3>
                          <div className={styles.orderArticle}>3GHIJ4</div>
                          <div className={styles.orderPrice}>22 350 ₸</div>
                        </div>
                       <div className={styles.orderSpecs}>
                         <div className={styles.orderSpec}>
                           <span className={styles.specLabel}>Цвет:</span>
                           <span className={styles.specValue}>Синий</span>
                         </div>
                         <div className={styles.orderSpec}>
                           <span className={styles.specLabel}>Размер:</span>
                           <span className={styles.specValue}>M</span>
                         </div>
                         <div className={styles.orderSpec}>
                           <span className={styles.specLabel}>Доставка:</span>
                           <span className={styles.specValue}>18.09.2025</span>
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

             <div className={styles.rightColumn}>
               <div className={styles.block}>
                 <h2 className={styles.blockTitle}>История заказов</h2>
                 <div className={styles.ordersList}>
                   <div className={styles.orderItem}>
                     <div className={styles.orderImage}>
                       <img src="/pic_4.png" alt="Product" />
                     </div>
                                           <div className={styles.orderDetails}>
                        <div className={styles.orderNameArticlePrice}>
                          <h3 className={styles.orderName}>NOMADMOOD ASAR UME STYLE</h3>
                          <div className={styles.orderArticle}>4KLMN5</div>
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
                           <span className={styles.specValue}>12.07.2025</span>
                         </div>
                       </div>
                                                                                                <div className={styles.orderActions}>
                          <button className={styles.orderAction}>Открыть товар</button>
                          <button className={styles.orderAction}>Заказать еще</button>
                          <button className={styles.orderAction} onClick={handleReviewClick}>Оставить отзыв</button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.orderItem}>
                      <div className={styles.orderImage}>
                        <img src="/pic_5.png" alt="Product" />
                      </div>
                      <div className={styles.orderDetails}>
                        <div className={styles.orderNameArticlePrice}>
                          <h3 className={styles.orderName}>NOMADMOOD ASAR UME STYLE</h3>
                          <div className={styles.orderArticle}>5OPQR6</div>
                          <div className={styles.orderPrice}>21 900 ₸</div>
                        </div>
                        <div className={styles.orderSpecs}>
                          <div className={styles.orderSpec}>
                            <span className={styles.specLabel}>Цвет:</span>
                            <span className={styles.specValue}>Черный</span>
                          </div>
                          <div className={styles.orderSpec}>
                            <span className={styles.specLabel}>Размер:</span>
                            <span className={styles.specValue}>L</span>
                          </div>
                          <div className={styles.orderSpec}>
                            <span className={styles.specLabel}>Доставлено:</span>
                            <span className={styles.specValue}>12.07.2025</span>
                          </div>
                        </div>
                        <div className={styles.orderActions}>
                          <button className={styles.orderAction}>Открыть товар</button>
                          <button className={styles.orderAction}>Заказать еще</button>
                          <button className={styles.orderAction} onClick={handleReviewClick}>Оставить отзыв</button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.orderItem}>
                      <div className={styles.orderImage}>
                        <img src="/pic_6.png" alt="Product" />
                      </div>
                      <div className={styles.orderDetails}>
                        <div className={styles.orderNameArticlePrice}>
                          <h3 className={styles.orderName}>NOMADMOOD ASAR UME STYLE</h3>
                          <div className={styles.orderArticle}>6STUV7</div>
                          <div className={styles.orderPrice}>22 350 ₸</div>
                        </div>
                        <div className={styles.orderSpecs}>
                          <div className={styles.orderSpec}>
                            <span className={styles.specLabel}>Цвет:</span>
                            <span className={styles.specValue}>Синий</span>
                          </div>
                          <div className={styles.orderSpec}>
                            <span className={styles.specLabel}>Размер:</span>
                            <span className={styles.specValue}>M</span>
                          </div>
                          <div className={styles.orderSpec}>
                            <span className={styles.specLabel}>Доставлено:</span>
                            <span className={styles.specValue}>12.07.2025</span>
                          </div>
                        </div>
                        <div className={styles.orderActions}>
                          <button className={styles.orderAction}>Открыть товар</button>
                          <button className={styles.orderAction}>Заказать еще</button>
                          <button className={styles.orderAction} onClick={handleReviewClick}>Оставить отзыв</button>
                        </div>
                      </div>
                    </div>
                 </div>
                 <button className={styles.showMoreButton}>Показать больше</button>
               </div>
             </div>
           </div>

           <div className={styles.bottomBlocks}>
             <div className={styles.leftColumn}>
               <div className={styles.block}>
                 <h2 className={styles.blockTitle}>СВЯЖИТЕСЬ С НАМИ</h2>
                 <div className={styles.contactInfo}>
                   <p className={styles.contactText}>
                     Наша команда поддержки клиентов поможет вам
                   </p>
                   <button className={styles.contactButton}>
                     Связаться с нами
                   </button> 
                 </div>
               </div>
             </div>
           </div>
         </div>
               )}

        {activeTab === 'wishlist' && (
          <ProductGrid title="Список желаемого" products={wishlistProducts} />
        )}

        {activeTab === 'reviews' && (
          <div className={styles.content}>
            <div className={styles.reviewsContainer}>
              <h1 className={styles.reviewsTitle}>Мои отзывы</h1>
              <div className={styles.reviewsList}>
                {reviews.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewImage}>
                      <img src={review.image} alt={review.productName} />
                    </div>
                                         <div className={styles.reviewContent}>
                       <div className={styles.reviewProductInfo}>
                         <h3 className={styles.reviewProductName}>{review.productName}</h3>
                         <div className={styles.reviewArticle}>{review.article}</div>
                         <div className={styles.reviewDate}>Дата отзыва: {review.date}</div>
                       </div>
                       <div className={styles.reviewRatingSection}>
                         <div className={styles.reviewRating}>
                           <span className={styles.ratingLabel}>Ваша оценка:</span>
                           {[1, 2, 3, 4, 5].map((star) => (
                             <svg
                               key={star}
                               width="12"
                               height="12"
                               viewBox="0 0 16 16"
                               fill="none"
                               xmlns="http://www.w3.org/2000/svg"
                             >
                               <path
                                 d="M8 1L10.18 5.5L15 6.18L11.5 9.82L12.36 14.64L8 12.18L3.64 14.64L4.5 9.82L1 6.18L5.82 5.5L8 1Z"
                                 fill={star <= review.rating ? "#000" : "transparent"}
                                 stroke="#000"
                                 strokeWidth="1"
                               />
                             </svg>
                           ))}
                         </div>
                         <div className={styles.reviewStore}>Магазин: {review.store}</div>
                       </div>
                       <div className={styles.reviewTextSection}>
                         <div className={styles.reviewText}>{review.text}</div>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

       <button className={styles.logoutButton}>
         Выйти
       </button>

      <AtlasFooter />
    </main>
  );
} 