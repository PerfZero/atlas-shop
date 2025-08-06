'use client';

import { useState, useEffect } from 'react';
import styles from './ProductDetail.module.css';
import Toast from './Toast';
import { CategoryAPI, Product } from '../services/categoryApi';
import { CartApi } from '../services/cartApi';
import { WordPressAPI } from '../services/wordpressApi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  productId: string;
}

interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { token } = useAuth();
  const { updateCartCount } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('XS');
  const [selectedColor, setSelectedColor] = useState('Серый');
  const [selectedColorImage, setSelectedColorImage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{
    shortDescription: boolean;
    description: boolean;
    characteristics: boolean;
  }>({
    shortDescription: false,
    description: false,
    characteristics: false
  });

  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await CategoryAPI.getProduct(parseInt(productId), token || undefined);
        
        if (response.success && response.product) {
          setProduct(response.product);
          // Устанавливаем статус избранного из данных товара
          setIsFavorite(response.product.is_favorite);
          // Устанавливаем первый цвет как выбранный, если есть
          if (response.product.color_images && response.product.color_images.length > 0) {
            setSelectedColor(response.product.color_images[0].color_name);
            setSelectedColorImage(response.product.color_images[0].image);
          } else if (response.product.attributes?.colors && response.product.attributes.colors.length > 0) {
            setSelectedColor(response.product.attributes.colors[0].name);
            setSelectedColorImage(response.product.image);
          }
          // Устанавливаем первый размер как выбранный, если есть
          if (response.product.attributes?.sizes && response.product.attributes.sizes.length > 0) {
            setSelectedSize(response.product.attributes.sizes[0].name);
          }
        } else {
          setError(response.message || 'Товар не найден');
        }
      } catch (err) {
        setError('Ошибка загрузки товара');
        console.error('Ошибка загрузки товара:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId, token]);

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.sizeDropdownContainer}`)) {
        setIsSizeDropdownOpen(false);
      }
    };

    if (isSizeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSizeDropdownOpen]);

  const toggleFavorite = async () => {
    if (!token) {
      setToast({
        isVisible: true,
        message: 'Необходимо войти в аккаунт',
        type: 'error'
      });
      return;
    }

    try {
      if (isFavorite) {
        const result = await WordPressAPI.removeFromWishlist(token, parseInt(productId));
        if (result.success) {
          setIsFavorite(false);
          setToast({
            isVisible: true,
            message: 'Товар удален из избранного',
            type: 'success'
          });
        } else {
          setToast({
            isVisible: true,
            message: 'Ошибка удаления из избранного',
            type: 'error'
          });
        }
      } else {
        const result = await WordPressAPI.addToWishlist(token, parseInt(productId));
        if (result.success) {
          setIsFavorite(true);
          setToast({
            isVisible: true,
            message: 'Товар добавлен в избранное',
            type: 'success'
          });
        } else {
          setToast({
            isVisible: true,
            message: 'Ошибка добавления в избранное',
            type: 'error'
          });
        }
      }
    } catch (error) {
      console.error('Ошибка работы с избранным:', error);
      setToast({
        isVisible: true,
        message: 'Ошибка работы с избранным',
        type: 'error'
      });
    }
  };

  const addToCart = async () => {
    if (!token) {
      setToast({
        isVisible: true,
        message: 'Необходимо войти в аккаунт',
        type: 'error'
      });
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      const result = await CartApi.addToCart(
        product.id,
        1,
        selectedSize,
        selectedColor,
        token
      );

      if (result.success) {
        setToast({
          isVisible: true,
          message: result.message || 'Товар добавлен в корзину',
          type: 'success'
        });
        updateCartCount();
      } else {
        setToast({
          isVisible: true,
          message: result.message || 'Ошибка при добавлении в корзину',
          type: 'error'
        });
      }
    } catch (error) {
      setToast({
        isVisible: true,
        message: 'Ошибка при добавлении в корзину',
        type: 'error'
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleColorChange = (colorName: string, colorImage: string) => {
    setSelectedColor(colorName);
    setSelectedColorImage(colorImage);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setIsSizeDropdownOpen(false);
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const toggleSection = (section: 'shortDescription' | 'description' | 'characteristics') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.loading}>Загрузка товара...</div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.error}>
            {error || 'Товар не найден'}
          </div>
        </div>
      </section>
    );
  }

  // Подготавливаем изображения для галереи
  const allImages = product.image ? [product.image, ...product.gallery] : product.gallery;
  
  // Подготавливаем цвета из атрибутов с изображениями
  const colors = (product.color_images && product.color_images.length > 0)
    ? product.color_images.map(colorImage => ({
        name: colorImage.color_name,
        image: colorImage.image
      }))
    : (product.attributes?.colors && product.attributes.colors.length > 0)
      ? product.attributes.colors.map(color => ({
          name: color.name,
          image: product.image || '/product_1.png'
        }))
      : [];

  // Подготавливаем размеры из атрибутов
  const sizes = (product.attributes?.sizes && product.attributes.sizes.length > 0)
    ? product.attributes.sizes.map(size => size.name)
    : ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Подготавливаем регионы доставки
  const deliveryRegions = (product.attributes?.delivery_regions && product.attributes.delivery_regions.length > 0)
    ? product.attributes.delivery_regions.map(region => region.name)
    : ['По всему Казахстану'];

  // Подготавливаем сроки доставки
  const deliveryTimes = (product.attributes?.delivery_times && product.attributes.delivery_times.length > 0)
    ? product.attributes.delivery_times.map(time => time.name)
    : ['Сегодня', 'Завтра', 'До 2 дней', 'До 5 дней', 'До 7 дней'];

  return (
    <>
      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <img src={selectedColorImage || allImages[0] || '/product_1.png'} alt={product.name} />
            </div>
            <div className={styles.additionalImages}>
              {allImages.slice(1).map((image, index) => (
                <div key={index} className={styles.additionalImage}>
                  <img src={image} alt={`${product.name} ${index + 2}`} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.productHeader}>
              <div className={styles.productInfo}>
                <div className={styles.sku}>{product.sku || 'N/A'}</div>
                <h1 className={styles.productName}>
                  {product.categories && product.categories.length > 0 
                    ? product.categories[0].name.toUpperCase() 
                    : 'ТОВАР'}
                </h1>
                <h2 className={styles.productTitle}>{product.name}</h2>
                <div className={styles.price}>{product.price}</div>
                {product.regular_price && product.regular_price !== product.price && (
                  <div className={styles.regularPrice}>{product.regular_price}</div>
                )}
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

            {colors.length > 0 && (
              <div className={styles.colorsSection}>
                <h3 className={styles.sectionTitle}>
                  Цвета
                  <div className={styles.selectedColor}>{selectedColor}</div>
                </h3>
                
                <div className={styles.colorThumbnails}>
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={`${styles.colorThumbnail} ${selectedColor === color.name ? styles.selected : ''}`}
                      onClick={() => handleColorChange(color.name, color.image)}
                    >
                      <img src={color.image} alt={color.name} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className={styles.sizeSection}>
                <h3 className={styles.sectionTitle}>Размеры</h3>
                <div className={styles.sizeDropdownContainer}>
                  <div 
                    className={styles.sizeDropdown}
                    onClick={toggleSizeDropdown}
                  >
                    <span className={styles.selectedSize}>{selectedSize}</span>
                    <svg 
                      width="12" 
                      height="6" 
                      viewBox="0 0 12 6" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${styles.dropdownArrow} ${isSizeDropdownOpen ? styles.rotated : ''}`}
                    >
                      <path d="M1 1L6 5L11 1" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {isSizeDropdownOpen && (
                    <div className={styles.sizeDropdownMenu}>
                      {sizes.map((size) => (
                        <div
                          key={size}
                          className={`${styles.sizeOption} ${selectedSize === size ? styles.selectedSizeOption : ''}`}
                          onClick={() => handleSizeChange(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.availableSizes}>
                  Доступные размеры: {sizes.join(', ')}
                </div>
              </div>
            )}

                        <div className={styles.deliveryGeographySection}>
              <h3 className={styles.sectionTitle}>География доставки</h3>
              <p className={styles.deliveryGeography}>{deliveryRegions.join(', ')}</p>
            </div>

            <div className={styles.deliveryTimeSection}>
              <h3 className={styles.sectionTitle}>Срок получения</h3>
              <div className={styles.deliveryOptions}>
                {deliveryTimes.map((option, index) => (
                  <span key={index} className={styles.deliveryOption}>
                    {option}
                    {index < deliveryTimes.length - 1 && <span className={styles.separator}>/</span>}
                  </span>
                ))}
              </div>
              <p className={styles.deliveryNote}>Вы можете выбрать срок получения после добавления в корзину</p>
            </div>

            <div className={styles.actionButtons}>
              <button 
                className={styles.addToCartButton} 
                onClick={addToCart}
                disabled={!product.in_stock || addingToCart}
              >
                {addingToCart ? 'Добавление...' : (product.in_stock ? 'Добавить в корзину' : 'Нет в наличии')}
              </button>
            </div>

            <div className={styles.storeInfo}>
              <p className={styles.store}>Товар от магазина {product.store}</p>
              <p className={styles.delivery}>Оплата и доставка - напрямую</p>
            </div>

            <div className={styles.bottomSections}>
              {product.short_description && (
                <div className={styles.collapsibleSection}>
                  <h3 
                    className={styles.sectionTitle}
                    onClick={() => toggleSection('shortDescription')}
                  >
                    Краткое описание
                    <span className={`${styles.expandIcon} ${expandedSections.shortDescription ? styles.expanded : ''}`}>
                      {expandedSections.shortDescription ? '−' : '+'}
                    </span>
                  </h3>
                  {expandedSections.shortDescription && (
                    <div className={styles.shortDescription}>
                      {product.short_description}
                    </div>
                  )}
                </div>
              )}

              {(product.description || product.content) && (
                <div className={styles.collapsibleSection}>
                  <h3 
                    className={styles.sectionTitle}
                    onClick={() => toggleSection('description')}
                  >
                    Описание
                    <span className={`${styles.expandIcon} ${expandedSections.description ? styles.expanded : ''}`}>
                      {expandedSections.description ? '−' : '+'}
                    </span>
                  </h3>
                  {expandedSections.description && (
                    <div className={styles.description}>
                      {product.content || product.description}
                    </div>
                  )}
                </div>
              )}

              {product.characteristics && product.characteristics.length > 0 && (
                <div className={styles.collapsibleSection}>
                  <h3 
                    className={styles.sectionTitle}
                    onClick={() => toggleSection('characteristics')}
                  >
                    Характеристики
                    <span className={`${styles.expandIcon} ${expandedSections.characteristics ? styles.expanded : ''}`}>
                      {expandedSections.characteristics ? '−' : '+'}
                    </span>
                  </h3>
                  {expandedSections.characteristics && (
                    <div className={styles.characteristics}>
                      {product.characteristics.map((characteristic, index) => (
                        <p key={index} className={styles.characteristicItem}>
                          {characteristic}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
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