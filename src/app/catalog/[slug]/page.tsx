'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CategoryAPI, Category, Product as CategoryProduct } from '../../../services/categoryApi';
import { WordPressAPI } from '../../../services/wordpressApi';
import CatalogHeader from '../../../components/CatalogHeader';
import CatalogNavigation from '../../../components/CatalogNavigation';
import ProductGrid from '../../../components/ProductGrid';
import PartnersSection from '../../../components/PartnersSection';
import PlatformSection from '../../../components/PlatformSection';
import AtlasFooter from '../../../components/AtlasFooter';
import styles from '../page.module.css';

interface SimpleProduct {
  id: number;
  name: string;
  price: string;
  store: string;
  image: string;
  is_favorite: boolean;
  characteristics?: string[];
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Загружаем данные категории по slug:', slug);
        
        // Сначала получаем все категории и ищем нужную по slug
        const categoriesResponse = await CategoryAPI.getCategories();
        if (!categoriesResponse.success) {
          throw new Error('Ошибка загрузки категорий');
        }
        
        const foundCategory = categoriesResponse.categories.find(cat => cat.slug === slug);
        if (!foundCategory) {
          throw new Error('Категория не найдена');
        }
        
        setCategory(foundCategory);
        console.log('Найдена категория:', foundCategory);
        
        // Получаем токен для проверки избранного
        const token = WordPressAPI.getSavedToken();
        
        // Загружаем товары категории
        const productsResponse = await CategoryAPI.getCategoryProducts(foundCategory.id, 1, 12, token || undefined);
        if (productsResponse.success) {
          // Преобразуем товары в формат SimpleProduct
          const simpleProducts = productsResponse.products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            store: product.store,
            image: product.image || '',
            is_favorite: product.is_favorite,
            characteristics: product.characteristics
          }));
          setProducts(simpleProducts);
          console.log('Товары категории загружены:', simpleProducts);
          console.log('Проверяем is_favorite для каждого товара:');
          simpleProducts.forEach(product => {
            console.log(`Товар ${product.id} (${product.name}): is_favorite = ${product.is_favorite}`);
          });
        } else {
          console.warn('Ошибка загрузки товаров категории:', productsResponse);
          setProducts([]);
        }
        
      } catch (error) {
        console.error('Ошибка загрузки данных категории:', error);
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadCategoryData();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <CatalogNavigation />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>Загрузка категории...</div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <CatalogNavigation />
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>
            <h2>Ошибка</h2>
            <p>{error}</p>
          </div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  if (!category) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <CatalogNavigation />
        <div className={styles.errorContainer}>
          <div className={styles.errorMessage}>
            <h2>Категория не найдена</h2>
            <p>Запрашиваемая категория не существует</p>
          </div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <CatalogHeader />
      <CatalogNavigation />
      
      {products.length > 0 ? (
        <ProductGrid title={category.name} products={products} />
      ) : (
        <div className={styles.noProductsContainer}>
          <div className={styles.noProductsMessage}>
            <h2>{category.name}</h2>
            <p>В данной категории пока нет товаров</p>
          </div>
        </div>
      )}
      
      <PartnersSection />
      <PlatformSection />
      <AtlasFooter />
    </main>
  );
} 