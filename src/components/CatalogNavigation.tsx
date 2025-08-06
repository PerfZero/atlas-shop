'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { CategoryAPI, Category } from '../services/categoryApi';
import styles from './CatalogNavigation.module.css';

export default function CatalogNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentMainCategory, setCurrentMainCategory] = useState<Category | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Загружаем категории при монтировании компонента
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        console.log('Загружаем категории для навигации...');
        
        // Получаем все основные категории
        const allCategoriesResponse = await CategoryAPI.getCategories();
        if (!allCategoriesResponse.success) {
          throw new Error('Ошибка загрузки категорий');
        }
        
        // Сохраняем основные категории для выпадающего меню
        setMainCategories(allCategoriesResponse.categories);
        
        // Определяем текущую категорию из URL
        const currentSlug = pathname.split('/catalog/')[1];
        if (currentSlug) {
          const currentCat = allCategoriesResponse.categories.find(cat => cat.slug === currentSlug);
          if (currentCat) {
            setCurrentMainCategory(currentCat);
            console.log('Установлена текущая категория:', currentCat.name);
            
            // Загружаем дочерние категории для текущей категории
            const childrenResponse = await CategoryAPI.getCategoryChildren(currentCat.id);
            if (childrenResponse.success && childrenResponse.children) {
              setCategories(childrenResponse.children);
              console.log('Подкатегории загружены:', childrenResponse.children);
            } else {
              console.warn('Нет дочерних категорий или ошибка загрузки:', childrenResponse);
              setCategories([]);
            }
          } else {
            // Если категория не найдена, используем "Для женщин" по умолчанию
            const womenCategory = allCategoriesResponse.categories.find(cat => cat.id === 6);
            if (womenCategory) {
              setCurrentMainCategory(womenCategory);
              console.log('Установлена категория по умолчанию:', womenCategory.name);
              
              const childrenResponse = await CategoryAPI.getCategoryChildren(6);
              if (childrenResponse.success && childrenResponse.children) {
                setCategories(childrenResponse.children);
              } else {
                setCategories([]);
              }
            } else {
              setCategories([]);
            }
          }
        } else {
          // Если нет slug в URL, используем "Для женщин" по умолчанию
          const womenCategory = allCategoriesResponse.categories.find(cat => cat.id === 6);
          if (womenCategory) {
            setCurrentMainCategory(womenCategory);
            console.log('Установлена категория по умолчанию:', womenCategory.name);
            
            const childrenResponse = await CategoryAPI.getCategoryChildren(6);
            if (childrenResponse.success && childrenResponse.children) {
              setCategories(childrenResponse.children);
            } else {
              setCategories([]);
            }
          } else {
            setCategories([]);
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Определяем активную категорию из URL
  useEffect(() => {
    if (pathname.startsWith('/catalog/')) {
      const slug = pathname.split('/catalog/')[1];
      setActiveCategory(slug);
      
      // Находим основную категорию по slug
      const mainCat = mainCategories.find(cat => cat.slug === slug);
      if (mainCat) {
        setCurrentMainCategory(mainCat);
      }
    }
  }, [pathname, mainCategories]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.slug);
    router.push(`/catalog/${category.slug}`);
  };

  const handleMainCategoryClick = () => {
    // Переход на главную страницу каталога
    router.push('/catalog');
  };

  const handleDropdownToggle = () => {
    console.log('Клик по кнопке выпадающего меню, текущее состояние:', isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
    console.log('Новое состояние будет:', !isDropdownOpen);
  };

  const handleMainCategorySelect = (category: Category) => {
    setIsDropdownOpen(false);
    setCurrentMainCategory(category);
    router.push(`/catalog/${category.slug}`);
  };

  // Закрываем выпадающее меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.dropdownMenu}`)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContent}>
        <div className={styles.dropdownMenu}>
          <button 
            className={`${styles.dropdownButton} ${isDropdownOpen ? styles.active : ''}`} 
            onClick={handleDropdownToggle}
          >
            <span>{currentMainCategory ? currentMainCategory.name : 'Для женщин'}</span>
            <svg 
              width="12" 
              height="8" 
              viewBox="0 0 12 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={isDropdownOpen ? styles.rotated : ''}
            >
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div className={styles.dropdownList}>
              {mainCategories.map((category) => (
                <button
                  key={category.id}
                  className={styles.dropdownItem}
                  onClick={() => handleMainCategorySelect(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.separator}></div>

        <div className={styles.categoryButtons}>
          {loading ? (
            <div className={styles.loadingCategories}>Загрузка категорий...</div>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <button 
                key={category.id}
                className={`${styles.categoryButton} ${activeCategory === category.slug ? styles.active : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </button>
            ))
          ) : (
            <div className={styles.noCategories}>Категории не найдены</div>
          )}
        </div>

        <div className={styles.separator}></div>

        <button className={styles.filterButton}>
        <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.7176 9.27739C8.38056 9.27739 8.92296 8.73495 8.92296 8.07203C8.92296 7.40908 8.38056 6.86668 7.7176 6.86668C7.05464 6.86668 6.50723 7.40908 6.50723 8.07203C6.50723 8.73495 7.05464 9.27739 7.7176 9.27739ZM7.7176 8.65965C7.38614 8.65965 7.12999 8.39848 7.12999 8.07203C7.12999 7.73552 7.38614 7.48442 7.7176 7.48442C8.04906 7.48442 8.30522 7.73552 8.30522 8.07203C8.30522 8.39848 8.04906 8.65965 7.7176 8.65965ZM6.91904 7.66523H1.2589C1.0329 7.66523 0.857117 7.84601 0.857117 8.07203C0.857117 8.29802 1.0329 8.47382 1.2589 8.47382H6.91904V7.66523ZM10.5904 7.66523H8.5915V8.47382H10.5904C10.7963 8.47382 10.9771 8.29802 10.9771 8.07203C10.9771 7.84601 10.7963 7.66523 10.5904 7.66523ZM4.17185 6.21375C4.83479 6.21375 5.37722 5.66633 5.37722 5.00338C5.37722 4.34044 4.83479 3.79802 4.17185 3.79802C3.5089 3.79802 2.96649 4.34044 2.96649 5.00338C2.96649 5.66633 3.5089 6.21375 4.17185 6.21375ZM4.17185 5.59099C3.8454 5.59099 3.58424 5.32982 3.58424 5.00338C3.58424 4.67191 3.8454 4.41577 4.17185 4.41577C4.50332 4.41577 4.75946 4.67191 4.75946 5.00338C4.75946 5.32982 4.50332 5.59099 4.17185 5.59099ZM1.23881 4.59657C1.0329 4.59657 0.857117 4.77738 0.857117 5.00338C0.857117 5.22941 1.0329 5.40516 1.23881 5.40516H3.30801V4.59657H1.23881ZM10.5703 4.59657H4.9704V5.40516H10.5703C10.7963 5.40516 10.9771 5.22941 10.9771 5.00338C10.9771 4.77738 10.7963 4.59657 10.5703 4.59657ZM7.7176 3.1401C8.38056 3.1401 8.92296 2.59769 8.92296 1.93475C8.92296 1.2718 8.38056 0.724365 7.7176 0.724365C7.05464 0.724365 6.50723 1.2718 6.50723 1.93475C6.50723 2.59769 7.05464 3.1401 7.7176 3.1401ZM7.7176 2.52236C7.38614 2.52236 7.12999 2.2612 7.12999 1.92972C7.12999 1.59825 7.38614 1.34211 7.7176 1.34211C8.04906 1.34211 8.30522 1.59825 8.30522 1.92972C8.30522 2.2612 8.04906 2.52236 7.7176 2.52236ZM6.94416 1.53296H1.2589C1.0329 1.53296 0.857117 1.70874 0.857117 1.93475C0.857117 2.16075 1.0329 2.34155 1.2589 2.34155H6.94416V1.53296ZM10.5904 1.53296H8.52117V2.34155H10.5904C10.7963 2.34155 10.9771 2.16075 10.9771 1.93475C10.9771 1.70874 10.7963 1.53296 10.5904 1.53296Z" fill="black" />
</svg>
          <span>Фильтры</span>
        </button>
      </div>
    </nav>
  );
} 