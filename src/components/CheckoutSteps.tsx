'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import styles from './CheckoutSteps.module.css';

interface CheckoutStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  email: string;
  setEmail: (email: string) => void;
  subscribeToEmails: boolean;
  setSubscribeToEmails: (subscribe: boolean) => void;
}

export default function CheckoutSteps({
  currentStep,
  setCurrentStep,
  email,
  setEmail,
  subscribeToEmails,
  setSubscribeToEmails
}: CheckoutStepsProps) {
  const { user } = useAuth();
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressCompleted, setAddressCompleted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('online');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    region: '',
    index: '',
    street: '',
    houseNumber: '',
    entrance: '',
    apartment: '',
    intercom: '',
    floor: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setFormData(prev => ({
        ...prev,
        phone: user.phone || ''
      }));
      
      // Загружаем профиль пользователя для автозаполнения
      const loadUserProfile = async () => {
        try {
          const token = localStorage.getItem('atlas_token');
          if (token) {
            const response = await fetch('https://test.devdenis.ru/wp-json/atlas/v1/user/profile/load', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            
            if (response.ok) {
              const data = await response.json();
              if (data.success && data.profile) {
                setFormData(prev => ({
                  ...prev,
                  name: data.profile.firstName || '',
                  surname: data.profile.lastName || '',
                  region: data.profile.region || '',
                  index: data.profile.zipCode || '',
                  street: data.profile.street || '',
                  houseNumber: data.profile.houseNumber || '',
                  entrance: data.profile.entrance || '',
                  apartment: data.profile.apartment || '',
                  intercom: data.profile.intercom || '',
                  floor: data.profile.floor || '',
                  phone: user.phone || data.profile.phone || ''
                }));
              }
            }
          }
        } catch (error) {
          console.error('Ошибка загрузки профиля:', error);
        }
      };
      
      loadUserProfile();
    }
  }, [user, setEmail]);

  const steps = [
    { id: 1, title: "Идентификация" },
    { id: 2, title: "Данные для доставки" },
    { id: 3, title: "Оплата" }
  ];

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

  const validateEmail = (email: string) => {
    if (!email) return null;
    if (!email.includes('@')) {
      return `Адрес электронной почты должен содержать символ "@". В адресе "${email}" отсутствует символ "@".`;
    }
    return null;
  };

  const emailError = validateEmail(email);

  const handleContinue = () => {
    if (!emailError && email.trim()) {
      setCurrentStep(2);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchCity(city);
    setShowCityDropdown(false);
  };

  const handleCityContinue = () => {
    if (selectedCity && cities.includes(selectedCity)) {
      setShowAddressForm(true);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressContinue = async () => {
    if (formData.name && formData.surname && formData.phone) {
      // Сохраняем данные профиля
      try {
        const token = localStorage.getItem('atlas_token');
        if (token) {
          const response = await fetch('https://test.devdenis.ru/wp-json/atlas/v1/user/profile/save', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: formData.name,
              lastName: formData.surname,
              region: formData.region,
              zipCode: formData.index,
              street: formData.street,
              houseNumber: formData.houseNumber,
              entrance: formData.entrance,
              apartment: formData.apartment,
              intercom: formData.intercom,
              floor: formData.floor,
              email: email
            }),
          });
          
          if (response.ok) {
            console.log('Профиль сохранен');
          }
        }
      } catch (error) {
        console.error('Ошибка сохранения профиля:', error);
      }
      
      setAddressCompleted(true);
      setCurrentStep(3);
    }
  };

  const handlePaymentContinue = async () => {
    try {
      const token = localStorage.getItem('atlas_token');
      if (!token) {
        console.error('Токен не найден');
        return;
      }

      // Получаем данные корзины
      const cartResponse = await fetch('https://test.devdenis.ru/wp-json/atlas/v1/cart/with-categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!cartResponse.ok) {
        console.error('Ошибка получения корзины');
        return;
      }

      const cartData = await cartResponse.json();
      
      if (!cartData.success) {
        console.error('Ошибка получения корзины:', cartData.message);
        return;
      }

      // Создаем заказ
      const orderData = {
        customer_data: {
          email: email,
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          address: {
            city: selectedCity,
            region: formData.region,
            index: formData.index,
            street: formData.street,
            houseNumber: formData.houseNumber,
            entrance: formData.entrance,
            apartment: formData.apartment,
            intercom: formData.intercom,
            floor: formData.floor
          },
          payment_method: selectedPaymentMethod
        },
        cart_items: cartData.cart,
        total_amount: cartData.total_price_numeric
      };

      const orderResponse = await fetch('https://test.devdenis.ru/wp-json/atlas/v1/orders/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        console.error('Ошибка создания заказа');
        return;
      }

      const orderResult = await orderResponse.json();
      
      if (orderResult.success) {
        console.log('Заказ успешно создан:', orderResult.order_id);
        // Перенаправляем на страницу успешного заказа с ID заказа
        window.location.href = `/order-success?orderId=${orderResult.order_id}`;
      } else {
        console.error('Ошибка создания заказа:', orderResult.message);
      }
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
    }
  };

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className={styles.checkoutSteps}>
      <button className={styles.backButton}>
       <img src="/arrow.svg" alt="" />
      </button>

      <div className={styles.stepsContent}>
        <div className={styles.stepsList}>
          {steps.map((step) => (
                         <div 
               key={step.id} 
               className={`${styles.step} ${currentStep === step.id ? styles.active : ''} ${currentStep > step.id ? styles.completed : ''}`}
             >
                             <div className={styles.stepHeader}>
                 <div className={`${styles.stepNumber} ${currentStep > step.id ? styles.completed : ''}`}>
                   {currentStep > step.id ? (
                     <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M1 6L6 11L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   ) : (
                     step.id
                   )}
                 </div>
                 <span className={styles.stepTitle}>{step.title}</span>
               </div>
              
                                                           {currentStep === step.id && step.id === 1 && (
                  <div className={styles.stepContent}>
                    <p className={styles.stepDescription}>
                      Для того, чтобы лучше помочь вам, пожалуйста, введите свой адрес электронной почты
                    </p>
                    
                    <div className={styles.emailInput}>
                      <label htmlFor="email">Электронная почта*</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example"
                        required
                        className={emailError ? styles.inputError : ''}
                      />
                      {emailError && (
                        <div className={styles.errorMessage}>
                          {emailError}
                        </div>
                      )}
                    </div>

                    <div className={styles.checkboxContainer}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={subscribeToEmails}
                          onChange={(e) => setSubscribeToEmails(e.target.checked)}
                          className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>
                          Снимите флажок, если вы не хотите получать электронные письма от NomadMood. <br />
                          Подписываясь, Вы соглашаетесь с нашей Политикой конфиденциальности
                        </span>
                      </label>
                    </div>

                    <button 
                      className={styles.continueButton}
                      onClick={handleContinue}
                      disabled={!!emailError || !email.trim()}
                    >
                      Продолжить
                    </button>
                  </div>
                )}
                
                                 {currentStep > step.id && step.id === 1 && (
                   <div className={styles.stepContent}>
                     <div className={styles.emailInput}>
                       <label htmlFor="email">Ваша почта</label>
                       <div className={styles.emailDisplay}>
                         {email || "Satty33@gmail.com"}
                       </div>
                     </div>
                   </div>
                 )}

                 {currentStep > step.id && step.id === 2 && addressCompleted && (
                   <div className={styles.stepContent}>
                     <div className={styles.addressSummary}>
                       <label>Адрес доставки</label>
                       <div className={styles.addressDisplay}>
                         <div className={styles.addressName}>
                           {formData.name} {formData.surname}
                         </div>
                         <div className={styles.addressRegion}>
                           {formData.region}, {formData.index}
                         </div>
                         <div className={styles.addressStreet}>
                           {formData.street} {formData.houseNumber}
                         </div>
                         <div className={styles.addressDetails}>
                           Подъезд {formData.entrance}, кв {formData.apartment}, домофон {formData.intercom}, {formData.floor} этаж
                         </div>
                         <div className={styles.addressPhone}>
                           {formData.phone}
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               
                                                               {currentStep === step.id && step.id === 2 && (
                   <div className={styles.stepContent}>
                                           <div className={styles.content}>
                        <div className={styles.cityInput}>
                          <label htmlFor="city">Выберите город</label>
                          <div className={styles.selectWrapper}>
                            <input
                              type="text"
                              id="city"
                              value={searchCity}
                              placeholder="Выберите город"
                              className={styles.citySelect}
                              onChange={(e) => {
                                setSearchCity(e.target.value);
                                setShowCityDropdown(true);
                              }}
                              onFocus={() => setShowCityDropdown(true)}
                            />
                            <div className={styles.selectArrow}>
                              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            {showCityDropdown && (
                              <div className={styles.dropdown}>
                                {filteredCities.map((city) => (
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

                        <button 
                          className={styles.continueButton}
                          onClick={handleCityContinue}
                          disabled={!selectedCity || !cities.includes(selectedCity)}
                        >
                          Продолжить
                        </button>
                      </div>

                      {showAddressForm && (
                        <div className={styles.addressForm}>
                          <h3 className={styles.formTitle}>Для доставки о адреса нужны Ваши данные</h3>
                          
                          <div className={styles.formField}>
                            <label htmlFor="name">Имя *</label>
                            <input
                              type="text"
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleFormChange('name', e.target.value)}
                              placeholder="Введите имя"
                            />
                          </div>

                          <div className={styles.formField}>
                            <label htmlFor="surname">Фамилия *</label>
                            <input
                              type="text"
                              id="surname"
                              value={formData.surname}
                              onChange={(e) => handleFormChange('surname', e.target.value)}
                              placeholder="Введите фамилию"
                            />
                          </div>

                          <div className={styles.formField}>
                            <label htmlFor="region">Район *</label>
                            <input
                              type="text"
                              id="region"
                              value={formData.region}
                              onChange={(e) => handleFormChange('region', e.target.value)}
                              placeholder="Выберите"
                            />
                          </div>

                          <div className={styles.formField}>
                            <label htmlFor="index">Индекс *</label>
                            <input
                              type="text"
                              id="index"
                              value={formData.index}
                              onChange={(e) => handleFormChange('index', e.target.value)}
                              placeholder="Введите индекс"
                            />
                          </div>

                          <div className={styles.formRow}>
                            <div className={styles.formField}>
                              <label htmlFor="street">Улица *</label>
                              <input
                                type="text"
                                id="street"
                                value={formData.street}
                                onChange={(e) => handleFormChange('street', e.target.value)}
                                placeholder="Название улицы"
                              />
                            </div>
                            <div className={styles.formField}>
                              <label htmlFor="houseNumber">Номер дома *</label>
                              <input
                                type="text"
                                id="houseNumber"
                                value={formData.houseNumber}
                                onChange={(e) => handleFormChange('houseNumber', e.target.value)}
                                placeholder="Номер дома"
                              />
                            </div>
                          </div>

                          <div className={styles.formRow}>
                            <div className={styles.formField}>
                              <label htmlFor="entrance">Подъезд *</label>
                              <input
                                type="text"
                                id="entrance"
                                value={formData.entrance}
                                onChange={(e) => handleFormChange('entrance', e.target.value)}
                                placeholder="Номер подъезда"
                              />
                            </div>
                            <div className={styles.formField}>
                              <label htmlFor="apartment">Квартира *</label>
                              <input
                                type="text"
                                id="apartment"
                                value={formData.apartment}
                                onChange={(e) => handleFormChange('apartment', e.target.value)}
                                placeholder="Номер квартиры"
                              />
                            </div>
                            <div className={styles.formField}>
                              <label htmlFor="intercom">Домофон *</label>
                              <input
                                type="text"
                                id="intercom"
                                value={formData.intercom}
                                onChange={(e) => handleFormChange('intercom', e.target.value)}
                                placeholder="Номер домофона"
                              />
                            </div>
                            <div className={styles.formField}>
                              <label htmlFor="floor">Этаж *</label>
                              <input
                                type="text"
                                id="floor"
                                value={formData.floor}
                                onChange={(e) => handleFormChange('floor', e.target.value)}
                                placeholder="Номер этажа"
                              />
                            </div>
                          </div>

                          <div className={styles.formField}>
                            <label htmlFor="phone">Номер телефона *</label>
                            <input
                              type="tel"
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleFormChange('phone', e.target.value)}
                              placeholder="+7 (---) -- -- --"
                            />
                          </div>

                          <div className={styles.requiredFields}>
                            * Обязательные поля
                          </div>

                                                     <button 
                             className={styles.continueButton}
                             onClick={handleAddressContinue}
                             disabled={!formData.name || !formData.surname || !formData.phone}
                           >
                             Продолжить
                           </button>
                        </div>
                      )}
                   </div>
                                   )}

                  {currentStep === step.id && step.id === 3 && (
                    <div className={styles.stepContent}>
                      <div className={styles.paymentOptions}>
                        <div className={styles.paymentOption}>
                          <label className={styles.paymentLabel}>
                                                         <div 
                               className={styles.paymentRadio}
                               onClick={() => setSelectedPaymentMethod('online')}
                             >
                               {selectedPaymentMethod === 'online' && (
                                 <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M1 6L6 11L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
                               )}
                             </div>
                            <span className={styles.paymentText}>
                              Онлайн оплата VISA/MASTERCARD
                            </span>
                            <div className={styles.paymentIcon}>
                              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="16" rx="2" stroke="#E0E0E0" strokeWidth="1"/>
                                <path d="M4 8H6M8 8H10M12 8H14M16 8H18" stroke="#E0E0E0" strokeWidth="1" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </label>
                        </div>

                        <div className={styles.paymentOption}>
                          <label className={styles.paymentLabel}>
                                                         <div 
                               className={styles.paymentRadio}
                               onClick={() => setSelectedPaymentMethod('cash')}
                             >
                               {selectedPaymentMethod === 'cash' && (
                                 <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M1 6L6 11L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
                               )}
                             </div>
                            <span className={styles.paymentText}>
                              Наличными
                            </span>
                          </label>
                        </div>
                      </div>

                      <button 
                        className={styles.continueButton}
                        onClick={handlePaymentContinue}
                      >
                        Завершить заказ
                      </button>
                    </div>
                  )}
             </div>
           ))}
         </div>
       </div>
     </div>
   );
} 