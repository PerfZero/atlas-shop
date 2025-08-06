'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryAPI, Category } from '../services/categoryApi';
import AtlasHeader from '../components/AtlasHeader';
import HeroSection from '../components/HeroSection';
import LimitedEditionSection from '../components/LimitedEditionSection';
import ProductsSection from '../components/ProductsSection';
import GiftsSection from '../components/GiftsSection';
import PartnersSection from '../components/PartnersSection';
import ExclusiveSafiSection from '../components/ExclusiveSafiSection';
import PlatformSection from '../components/PlatformSection';
import AtlasFooter from '../components/AtlasFooter';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Загружаем категории при монтировании компонента
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        console.log('Загружаем родительские категории для главной страницы...');
        const response = await CategoryAPI.getCategories();
        console.log('Ответ API категорий:', response);
        if (response.success) {
          // Фильтруем только родительские категории (без parent_id или parent_id = 0)
          const parentCategories = response.categories.filter(category => 
            !category.parent_id || category.parent_id === 0
          );
          setCategories(parentCategories);
          console.log('Родительские категории загружены:', parentCategories);
        } else {
          console.error('Ошибка загрузки категорий:', response);
        }
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    // Переходим на страницу категории с ЧПУ URL
    router.push(`/catalog/${category.slug}`);
  };

  return (
    <main className={styles.main}>
      <AtlasHeader />
      <HeroSection />
      
      <section className={styles.categories}>
        <h2 className={styles.categoriesTitle}>Категории</h2>
        
        {categoriesLoading ? (
          <div className={styles.loadingCategories}>Загрузка категорий...</div>
        ) : categories.length > 0 ? (
          <>
            {/* Десктопная версия */}
            <div className={styles.categoriesGrid}>
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className={styles.categoryCard}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className={styles.categoryImage}>
                    <img 
                      src={category.image || '/pic_1.png'} 
                      alt={category.name} 
                    />
                  </div>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                </div>
              ))}
            </div>

            {/* Мобильная версия - слайдер */}
            <div className={styles.mobileSlider}>
              <div className={styles.sliderContainer}>
                <div className={styles.sliderTrack}>
                  {categories.map((category) => (
                    <div 
                      key={category.id} 
                      className={styles.categoryCard}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className={styles.categoryImage}>
                        <img 
                          src={category.image || '/pic_1.png'} 
                          alt={category.name} 
                        />
                      </div>
                      <h3 className={styles.categoryName}>{category.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noCategories}>Категории не найдены</div>
        )}
      </section>

            <LimitedEditionSection />
      <ProductsSection />
      <GiftsSection />
      <PartnersSection />
 
      <PlatformSection />
      <AtlasFooter />

 
    </main>
  );
}
