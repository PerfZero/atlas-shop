'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { WordPressAPI } from '../../services/wordpressApi';
import CatalogHeader from '../../components/CatalogHeader';
import ProductGrid from '../../components/ProductGrid';
import AtlasFooter from '../../components/AtlasFooter';
import Toast from '../../components/Toast';
import styles from './page.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [searchRegion, setSearchRegion] = useState('');
  
  // Refs для выпадающих списков
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);
  
  // Состояние для полей профиля
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    region: '',
    zipCode: '',
    street: '',
    houseNumber: '',
    entrance: '',
    apartment: '',
    intercom: '',
    floor: '',
    email: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Состояние для заказов
  const [orders, setOrders] = useState<Array<{
    id: string;
    status: string;
    total_amount: number;
    created_at: string;
    updated_at?: string;
    cart_items: Array<{
      id: number;
      name: string;
      sku: string;
      image: string;
    }>;
  }>>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  
  // Состояние для избранного
  const [wishlist, setWishlist] = useState<Array<{
    id: number;
    name: string;
    price: string;
    store: string;
    image: string;
    is_favorite: boolean;
    characteristics?: string[];
  }>>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  
  // Состояние для отзывов
  const [userReviews, setUserReviews] = useState<Array<{
    id: string;
    product_name: string;
    product_sku: string;
    product_image: string;
    rating: number;
    text: string;
    created_at: string;
  }>>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  
  // Состояние для toast
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

  // Загружаем данные профиля при инициализации
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProfileData();
      loadOrders(); // Загружаем заказы при инициализации
    }
  }, [isAuthenticated, user]);

  // Обрабатываем параметр tab из URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam && ['general', 'profile', 'purchases', 'wishlist', 'reviews'].includes(tabParam)) {
        setActiveTab(tabParam);
        // Если переключаемся на purchases, загружаем заказы
        if (tabParam === 'purchases') {
          loadOrders();
        }
            // Если переключаемся на wishlist, загружаем избранное
    if (tabParam === 'wishlist') {
      loadWishlist();
    }
    // Если переключаемся на reviews, загружаем отзывы
    if (tabParam === 'reviews') {
      loadUserReviews();
    }
      }
    }
  }, []);

  // Закрытие выпадающих списков при клике вне их
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Проверяем, что клик не был внутри выпадающих списков
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(target)) {
        setShowCityDropdown(false);
      }
      
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(target)) {
        setShowRegionDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const loadProfileData = async () => {
    setProfileLoading(true);
    try {
      const token = WordPressAPI.getSavedToken();
      if (token) {
        const result = await WordPressAPI.loadUserProfile(token);
        if (result.success && result.profile) {
          setProfileData(result.profile);
          // Обновляем состояние поиска для городов и районов
          if (result.profile.city) {
            setSelectedCity(result.profile.city);
            setSearchCity(result.profile.city);
          }
          if (result.profile.region) {
            setSelectedRegion(result.profile.region);
            setSearchRegion(result.profile.region);
          }
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const token = WordPressAPI.getSavedToken();
      if (token) {
        const response = await fetch('https://test.devdenis.ru/wp-json/atlas/v1/orders/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setOrders(data.orders || []);
          } else {
            console.error('Ошибка загрузки заказов:', data.message);
          }
        } else {
          console.error('Ошибка загрузки заказов');
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const loadWishlist = async () => {
    setWishlistLoading(true);
    try {
      const token = WordPressAPI.getSavedToken();
      if (token) {
        const result = await WordPressAPI.getWishlist(token);
        if (result.success) {
          setWishlist(result.wishlist || []);
        } else {
          console.error('Ошибка загрузки избранного:', result.message);
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки избранного:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const loadUserReviews = async () => {
    setReviewsLoading(true);
    try {
      const token = WordPressAPI.getSavedToken();
      if (token) {
        const result = await WordPressAPI.getUserReviews(token);
        if (result.success) {
          setUserReviews(result.reviews || []);
        } else {
          console.error('Ошибка загрузки отзывов:', result.message);
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
    handleProfileChange('city', city);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setSearchRegion(region);
    setShowRegionDropdown(false);
    handleProfileChange('region', region);
  };

     const handleReviewClick = (productId: number) => {
     router.push(`/review?product_id=${productId}`);
   };

   const handleOpenProduct = (productId: number) => {
     router.push(`/product/${productId}`);
   };

       const handleOrderAgain = (productId: number) => {
      router.push(`/product/${productId}`);
    };

    const handleRemoveFromWishlist = async (productId: number) => {
      try {
        const token = WordPressAPI.getSavedToken();
        if (token) {
          const result = await WordPressAPI.removeFromWishlist(token, productId);
          if (result.success) {
            setWishlist(prev => prev.filter(item => item.id !== productId));
            showToast('Товар удален из избранного', 'success');
          } else {
            showToast('Ошибка удаления из избранного', 'error');
          }
        }
      } catch (error) {
        console.error('Ошибка удаления из избранного:', error);
        showToast('Ошибка удаления из избранного', 'error');
      }
    };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Прокручиваем вверх при переключении вкладок
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Загружаем заказы при переключении на таб "Мои покупки"
    if (tabId === 'purchases') {
      loadOrders();
    }
    
    // Загружаем избранное при переключении на таб "Список желаемого"
    if (tabId === 'wishlist') {
      loadWishlist();
    }
    
    // Загружаем отзывы при переключении на таб "Мои отзывы"
    if (tabId === 'reviews') {
      loadUserReviews();
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'Ожидает обработки',
      'processing': 'В обработке',
      'shipped': 'Отправлен',
      'delivered': 'Доставлен',
      'cancelled': 'Отменен'
    };
    return statusMap[status] || status;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatAddress = (address: {
    street?: string;
    houseNumber?: string;
    entrance?: string;
    apartment?: string;
    floor?: string;
  } | string) => {
    if (typeof address === 'string') return address;
    if (typeof address === 'object') {
      const parts = [
        address.street,
        address.houseNumber,
        address.entrance,
        address.apartment,
        address.floor
      ].filter(Boolean);
      return parts.join(', ');
    }
    return '';
  };

  const handleSaveProfile = async () => {
    try {
      const token = WordPressAPI.getSavedToken();
      if (token) {
        const result = await WordPressAPI.saveUserProfile(token, profileData);
        if (result.success) {
          showToast('Профиль успешно сохранен!', 'success');
          // Переключаемся на вкладку "Общее" чтобы показать обновленные данные
          setActiveTab('general');
          // Прокручиваем вверх
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          showToast('Ошибка сохранения: ' + (result.message || 'Неизвестная ошибка'), 'error');
        }
      } else {
        showToast('Ошибка: токен не найден', 'error');
      }
    } catch (error) {
      console.error('Ошибка сохранения профиля:', error);
      showToast('Ошибка сохранения профиля', 'error');
    }
  };



  const tabs = [
    { id: 'general', label: 'Общее' },
    { id: 'profile', label: 'Мой профиль' },
    { id: 'purchases', label: 'Мои покупки' },
    { id: 'wishlist', label: 'Список желаемого' },
    { id: 'reviews', label: 'Мои отзывы' }
  ];

  // Показываем загрузку
  if (loading) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка профиля...</p>
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
      
      <div className={styles.pageHeader}>
        <div className={styles.pageTitle}>Личный кабинет</div>
        <nav className={styles.pageTabs}>
          {tabs.map((tab, index) => (
            <div key={tab.id} className={styles.tabContainer}>
                             <button
                 className={`${styles.pageTab} ${activeTab === tab.id ? styles.activePageTab : ''}`}
                 onClick={() => handleTabChange(tab.id)}
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
                 <span>
                   {profileData.firstName && profileData.lastName 
                     ? `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`.toUpperCase()
                     : profileData.firstName 
                       ? profileData.firstName.charAt(0).toUpperCase()
                       : user 
                         ? user.phone.slice(-2).toUpperCase() 
                         : 'U'
                   }
                 </span>
               </div>
               <h1 className={styles.userName}>
                 {profileData.firstName && profileData.lastName 
                   ? `${profileData.firstName} ${profileData.lastName}`
                   : profileData.firstName 
                     ? profileData.firstName
                     : user 
                       ? `+${user.phone}` 
                       : 'Пользователь'
                 }
               </h1>
             </div>

            <div className={styles.blocksContainer}>
              <div className={styles.leftColumn}>
                                 <div className={styles.block}>
                   <h2 className={styles.blockTitle}>Мой профиль</h2>
                   <div className={styles.profileInfo}>
                     {profileLoading ? (
                       <div className={styles.loading}>
                         <div className={styles.loadingSpinner}></div>
                         <p>Загрузка данных профиля...</p>
                       </div>
                     ) : (
                       <>
                         <div className={styles.infoRow}>
                           <span className={styles.infoLabel}>Номер телефона:</span>
                           <span className={styles.infoValue}>{user ? `+${user.phone}` : 'Не указан'}</span>
                         </div>
                         {profileData.firstName && (
                           <div className={styles.infoRow}>
                             <span className={styles.infoLabel}>Имя:</span>
                             <span className={styles.infoValue}>{profileData.firstName}</span>
                           </div>
                         )}
                         {profileData.lastName && (
                           <div className={styles.infoRow}>
                             <span className={styles.infoLabel}>Фамилия:</span>
                             <span className={styles.infoValue}>{profileData.lastName}</span>
                           </div>
                         )}
                         {profileData.email && (
                           <div className={styles.infoRow}>
                             <span className={styles.infoLabel}>Email:</span>
                             <span className={styles.infoValue}>{profileData.email}</span>
                           </div>
                         )}
                         {profileData.city && (
                           <div className={styles.infoRow}>
                             <span className={styles.infoLabel}>Город:</span>
                             <span className={styles.infoValue}>{profileData.city}</span>
                           </div>
                         )}
                         {profileData.region && (
                           <div className={styles.infoRow}>
                             <span className={styles.infoLabel}>Район:</span>
                             <span className={styles.infoValue}>{profileData.region}</span>
                           </div>
                         )}
                         {(profileData.street || profileData.houseNumber) && (
                           <div className={styles.infoRow}>
                             <span className={styles.infoLabel}>Адрес:</span>
                             <span className={styles.infoValue}>
                               {[profileData.street, profileData.houseNumber, profileData.entrance, profileData.apartment, profileData.floor]
                                 .filter(Boolean)
                                 .join(', ')}
                             </span>
                           </div>
                         )}
                         {profileData.zipCode && (
                           <div className={styles.infoRow}>
                             <span className={styles.infoLabel}>Индекс:</span>
                             <span className={styles.infoValue}>{profileData.zipCode}</span>
                           </div>
                         )}
                         {!profileData.firstName && !profileData.lastName && !profileData.email && !profileData.city && (
                           <div className={styles.infoRow}>
                             <span className={styles.infoValue} style={{ color: '#666', fontStyle: 'italic' }}>
                               Данные профиля не заполнены
                             </span>
                           </div>
                         )}
                       </>
                     )}
                                           <button className={styles.editButton} onClick={() => handleTabChange('profile')}>
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
                    {ordersLoading ? (
                      <div className={styles.loading}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Загрузка заказов...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <>
                        <p className={styles.noOrders}>Нет заказов</p>
                        <button className={styles.shopButton} onClick={() => router.push('/catalog')}>
                          К покупкам
                        </button>
                      </>
                    ) : (
                      <div className={styles.ordersList}>
                        {orders.slice(0, 3).map((order) => (
                          <div key={order.id} className={styles.orderItem}>
                            <div className={styles.orderImage}>
                              <img src={order.cart_items[0]?.image || "/pic_1.png"} alt="Product" />
                            </div>
                            <div className={styles.orderDetails}>
                              <div className={styles.orderNameArticlePrice}>
                                <h3 className={styles.orderName}>{order.cart_items[0]?.name || "Товар"}</h3>
                                <div className={styles.orderArticle}>{order.cart_items[0]?.sku || order.id}</div>
                                <div className={styles.orderPrice}>{formatPrice(order.total_amount)}</div>
                              </div>
                              <div className={styles.orderSpecs}>
                                <div className={styles.orderSpec}>
                                  <span className={styles.specLabel}>Статус:</span>
                                  <span className={styles.specValue}>{getStatusText(order.status)}</span>
                                </div>
                                <div className={styles.orderSpec}>
                                  <span className={styles.specLabel}>Дата:</span>
                                  <span className={styles.specValue}>{new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                                </div>
                                <div className={styles.orderSpec}>
                                  <span className={styles.specLabel}>Товаров:</span>
                                  <span className={styles.specValue}>{order.cart_items.length}</span>
                                </div>
                              </div>
                              <div className={styles.orderActions}>
                                <button className={styles.orderAction} onClick={() => handleOpenProduct(order.cart_items[0]?.id)}>Открыть товар</button>
                                <button className={styles.orderAction} onClick={() => handleOrderAgain(order.cart_items[0]?.id)}>Заказать еще</button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {orders.length > 3 && (
                          <button 
                            className={styles.showMoreButton} 
                            onClick={() => handleTabChange('purchases')}
                          >
                            Показать все заказы ({orders.length})
                          </button>
                        )}
                      </div>
                    )}
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
                       <input 
                         type="text" 
                         placeholder="Введите имя" 
                         value={profileData.firstName}
                         onChange={(e) => handleProfileChange('firstName', e.target.value)}
                       />
                     </div>
                     <div className={styles.formField}>
                       <label>Фамилия *</label>
                       <input 
                         type="text" 
                         placeholder="Введите фамилию" 
                         value={profileData.lastName}
                         onChange={(e) => handleProfileChange('lastName', e.target.value)}
                       />
                     </div>
                                       <div className={styles.formField}>
                       <label>Город *</label>
                                               <div className={styles.selectWrapper} ref={cityDropdownRef}>
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
                                               <div className={styles.selectWrapper} ref={regionDropdownRef}>
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
                       <input 
                         type="text" 
                         placeholder="Введите индекс" 
                         value={profileData.zipCode}
                         onChange={(e) => handleProfileChange('zipCode', e.target.value)}
                       />
                     </div>
                                         <div className={styles.formRow}>
                       <div className={styles.formField}>
                         <label>Улица *</label>
                         <input 
                           type="text" 
                           placeholder="Название улицы" 
                           value={profileData.street}
                           onChange={(e) => handleProfileChange('street', e.target.value)}
                         />
                       </div>
                       <div className={styles.formField}>
                         <label>Номер дома *</label>
                         <input 
                           type="text" 
                           placeholder="Номер дома" 
                           value={profileData.houseNumber}
                           onChange={(e) => handleProfileChange('houseNumber', e.target.value)}
                         />
                       </div>
                     </div>
                                         <div className={styles.formRow}>
                       <div className={styles.formField}>
                         <label>Подъезд *</label>
                         <input 
                           type="text" 
                           placeholder="Номер подъезда" 
                           value={profileData.entrance}
                           onChange={(e) => handleProfileChange('entrance', e.target.value)}
                         />
                       </div>
                       <div className={styles.formField}>
                         <label>Квартира *</label>
                         <input 
                           type="text" 
                           placeholder="Номер квартиры" 
                           value={profileData.apartment}
                           onChange={(e) => handleProfileChange('apartment', e.target.value)}
                         />
                       </div>
                       <div className={styles.formField}>
                         <label>Домофон *</label>
                         <input 
                           type="text" 
                           placeholder="Номер домофона" 
                           value={profileData.intercom}
                           onChange={(e) => handleProfileChange('intercom', e.target.value)}
                         />
                       </div>
                       <div className={styles.formField}>
                         <label>Этаж *</label>
                         <input 
                           type="text" 
                           placeholder="Номер этажа" 
                           value={profileData.floor}
                           onChange={(e) => handleProfileChange('floor', e.target.value)}
                         />
                       </div>
                     </div>
                                         <div className={styles.requiredFields}>* Обязательные поля</div>
                     <button className={styles.saveButton} onClick={handleSaveProfile}>Сохранить</button>
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
                       <input type="tel" value={user ? `+${user.phone}` : ''} readOnly />
                     </div>
                     <div className={styles.formField}>
                       <label>Адрес электронной почты</label>
                       <input 
                         type="email" 
                         placeholder="Введите адрес электронной почты" 
                         value={profileData.email}
                         onChange={(e) => handleProfileChange('email', e.target.value)}
                       />
                     </div>
                                            <button className={styles.saveButton} onClick={handleSaveProfile}>Сохранить</button>
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
                    {ordersLoading ? (
                      <div className={styles.loading}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Загрузка заказов...</p>
                      </div>
                                         ) : orders.filter(order => order.status !== 'delivered').length === 0 ? (
                       <div className={styles.noOrders}>
                         <p>У вас пока нет текущих заказов</p>
                         <button className={styles.shopButton} onClick={() => router.push('/catalog')}>
                           Перейти к покупкам
                         </button>
                       </div>
                     ) : (
                       orders
                         .filter(order => order.status !== 'delivered')
                         .map((order) => (
                        <div key={order.id} className={styles.orderItem}>
                          <div className={styles.orderImage}>
                            <img src={order.cart_items[0]?.image || "/pic_1.png"} alt="Product" />
                          </div>
                          <div className={styles.orderDetails}>
                            <div className={styles.orderNameArticlePrice}>
                              <h3 className={styles.orderName}>{order.cart_items[0]?.name || "Товар"}</h3>
                              <div className={styles.orderArticle}>{order.cart_items[0]?.sku || order.id}</div>
                              <div className={styles.orderPrice}>{formatPrice(order.total_amount)}</div>
                            </div>
                            <div className={styles.orderSpecs}>
                              <div className={styles.orderSpec}>
                                <span className={styles.specLabel}>Статус:</span>
                                <span className={styles.specValue}>{getStatusText(order.status)}</span>
                              </div>
                              <div className={styles.orderSpec}>
                                <span className={styles.specLabel}>Дата:</span>
                                <span className={styles.specValue}>{new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                              </div>
                              <div className={styles.orderSpec}>
                                <span className={styles.specLabel}>Товаров:</span>
                                <span className={styles.specValue}>{order.cart_items.length}</span>
                              </div>
                            </div>
                                                         <div className={styles.orderActions}>
                               <button className={styles.orderAction} onClick={() => handleOpenProduct(order.cart_items[0]?.id)}>Открыть товар</button>
                               <button className={styles.orderAction} onClick={() => handleOrderAgain(order.cart_items[0]?.id)}>Заказать еще</button>
                             </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

                             <div className={styles.rightColumn}>
                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>История заказов</h2>
                  <div className={styles.ordersList}>
                    {ordersLoading ? (
                      <div className={styles.loading}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Загрузка истории...</p>
                      </div>
                    ) : orders.filter(order => order.status === 'delivered').length === 0 ? (
                      <div className={styles.noOrders}>
                        <p>Нет доставленных заказов</p>
                      </div>
                    ) : (
                      orders
                        .filter(order => order.status === 'delivered')
                        .map((order) => (
                          <div key={order.id} className={styles.orderItem}>
                            <div className={styles.orderImage}>
                              <img src={order.cart_items[0]?.image || "/pic_4.png"} alt="Product" />
                            </div>
                            <div className={styles.orderDetails}>
                              <div className={styles.orderNameArticlePrice}>
                                <h3 className={styles.orderName}>{order.cart_items[0]?.name || "Товар"}</h3>
                                <div className={styles.orderArticle}>{order.cart_items[0]?.sku || order.id}</div>
                                <div className={styles.orderPrice}>{formatPrice(order.total_amount)}</div>
                              </div>
                              <div className={styles.orderSpecs}>
                                <div className={styles.orderSpec}>
                                  <span className={styles.specLabel}>Статус:</span>
                                  <span className={styles.specValue}>{getStatusText(order.status)}</span>
                                </div>
                                <div className={styles.orderSpec}>
                                  <span className={styles.specLabel}>Дата доставки:</span>
                                  <span className={styles.specValue}>{new Date(order.updated_at || order.created_at).toLocaleDateString('ru-RU')}</span>
                                </div>
                                <div className={styles.orderSpec}>
                                  <span className={styles.specLabel}>Товаров:</span>
                                  <span className={styles.specValue}>{order.cart_items.length}</span>
                                </div>
                              </div>
                                                             <div className={styles.orderActions}>
                                 <button className={styles.orderAction} onClick={() => handleOpenProduct(order.cart_items[0]?.id)}>Открыть товар</button>
                                 <button className={styles.orderAction} onClick={() => handleOrderAgain(order.cart_items[0]?.id)}>Заказать еще</button>
                                 <button className={styles.orderAction} onClick={() => handleReviewClick(order.cart_items[0]?.id)}>Оставить отзыв</button>
                               </div>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                  {orders.filter(order => order.status === 'delivered').length > 3 && (
                    <button className={styles.showMoreButton}>Показать больше</button>
                  )}
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
          <ProductGrid title="Список желаемого" products={wishlist} />
        )}

        {activeTab === 'reviews' && (
          <div className={styles.content}>
              <div className={styles.reviewsContainer}>
                <h1 className={styles.reviewsTitle}>Мои отзывы</h1>
                <div className={styles.reviewsList}>
                {reviewsLoading ? (
                  <div className={styles.loading}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Загрузка отзывов...</p>
                  </div>
                ) : userReviews.length === 0 ? (
                  <div className={styles.noReviews}>
                    <p>У вас пока нет отзывов</p>
                    <button className={styles.shopButton} onClick={() => router.push('/catalog')}>
                      Перейти к покупкам
                    </button>
                  </div>
                ) : (
                  userReviews.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewImage}>
                      <img src={review.product_image || "/pic_1.png"} alt={review.product_name} />
                    </div>
                    <div className={styles.reviewContent}>
                      <div className={styles.reviewProductInfo}>
                        <h3 className={styles.reviewProductName}>{review.product_name}</h3>
                        <div className={styles.reviewArticle}>{review.product_sku}</div>
                        <div className={styles.reviewDate}>Дата отзыва: {new Date(review.created_at).toLocaleDateString('ru-RU')}</div>
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
                        <div className={styles.reviewStore}>Магазин: Atlas Store</div>
                      </div>
                      <div className={styles.reviewTextSection}>
                        <div className={styles.reviewText}>{review.text}</div>
                      </div>
                    </div>
                  </div>
                ))
                )}
              </div>
            </div>
          </div>
        )}

               <button className={styles.logoutButton} onClick={handleLogout}>
          Выйти
        </button>

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