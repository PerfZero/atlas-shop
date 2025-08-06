'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CatalogHeader from '../../components/CatalogHeader';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function SellerRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [sellerType, setSellerType] = useState('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const sellerTypes = [
    "Индивидуальный предприниматель",
    "Физическое лицо", 
    "Юридическое лицо"
  ];

  const handleTypeSelect = (type: string) => {
    setSellerType(type);
    setShowTypeDropdown(false);
  };

  const handleNextStep = () => {
    if (sellerType && currentStep === 1) {
      setCurrentStep(2);
    }
  };

  return (
    <main className={styles.main}>
      <CatalogHeader />
      
      <div className={styles.pageHeader}>
        <div className={styles.pageTitle}>Личный кабинет</div>
        <nav className={styles.pageTabs}>
          <div className={styles.tabContainer}>
            <button className={`${styles.pageTab} ${styles.activePageTab}`}>
              Общее
            </button>
            <div className={styles.tabSeparator}></div>
            <button className={styles.pageTab}>
              Мой профиль
            </button>
            <div className={styles.tabSeparator}></div>
            <button className={styles.pageTab}>
              Мои покупки
            </button>
            <div className={styles.tabSeparator}></div>
            <button className={styles.pageTab}>
              Список желаемого
            </button>
            <div className={styles.tabSeparator}></div>
            <button className={styles.pageTab}>
              Мои отзывы
            </button>
          </div>
        </nav>
      </div>

      <div className={styles.content}>
        <h1 className={styles.registrationTitle}>Регистрация продавца</h1>
        
        <div className={styles.registrationLayout}>
          <div className={styles.leftColumn}>
            <div className={styles.stepContainer}>
              <div className={`${styles.stepNumber} ${currentStep >= 1 ? styles.active : ''}`}>
                1
              </div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Тип продавца</h2>
                <div className={styles.formField}>
                  <label className={styles.fieldLabel}>Выберите</label>
                  <div className={styles.dropdownContainer}>
                    <button 
                      className={styles.dropdownButton}
                      onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                    >
                      {sellerType || "Выберите"}
                      <svg 
                        className={`${styles.dropdownArrow} ${showTypeDropdown ? styles.rotated : ''}`}
                        width="12" 
                        height="8" 
                        viewBox="0 0 12 8" 
                        fill="none"
                      >
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {showTypeDropdown && (
                      <div className={styles.dropdown}>
                        {sellerTypes.map((type, index) => (
                          <button
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => handleTypeSelect(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {sellerType && (
                  <button className={styles.nextButton} onClick={handleNextStep}>
                    Далее
                  </button>
                )}
              </div>
            </div>

            <div className={styles.stepContainer}>
              <div className={`${styles.stepNumber} ${currentStep >= 2 ? styles.active : ''}`}>
                2
              </div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Данные продавца</h2>
                <p className={styles.stepDescription}>
                  Этот шаг будет доступен после выбора типа продавца
                </p>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
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
        </div>
      </div>

      <AtlasFooter />
    </main>
  );
} 