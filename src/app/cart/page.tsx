'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { CartApi, CartItem } from '../../services/cartApi';
import { useCart } from '../../contexts/CartContext';
import CatalogHeader from '../../components/CatalogHeader';
import CartContent from '../../components/CartContent';
import CartSummary from '../../components/CartSummary';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

interface CartCategory {
  name: string;
  count: number;
  total: number;
}

export default function CartPage() {
  const { token, isAuthenticated } = useAuth();
  const { updateCartCount } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<CartCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isAuthenticated && token) {
      loadCart();
    } else {
      setLoading(false);
      setError('Необходимо войти в аккаунт');
    }
  }, [isAuthenticated, token]);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await CartApi.getCartWithCategories(token || undefined);
      
      if (response.success) {
        setCartItems(response.cart);
        setCategories(response.categories);
        setTotalPrice(response.total_price_numeric);
      } else {
        setError('Ошибка загрузки корзины');
      }
    } catch (error) {
      setError('Ошибка загрузки корзины');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number, size: string, color: string) => {
    if (!token) return;

    const originalItems = [...cartItems];
    const originalTotal = totalPrice;

    try {
      const itemIndex = cartItems.findIndex(item => 
        item.id === productId && item.size === size && item.color === color
      );

      if (itemIndex !== -1) {
        const updatedItems = [...cartItems];
        const oldQuantity = updatedItems[itemIndex].quantity;
        const pricePerItem = updatedItems[itemIndex].price_numeric;
        
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: quantity,
          total_price_numeric: pricePerItem * quantity,
          total_price: `${(pricePerItem * quantity).toLocaleString()} ₸`
        };

        setCartItems(updatedItems);
        setTotalPrice(prev => prev - (pricePerItem * oldQuantity) + (pricePerItem * quantity));
      }

      const response = await CartApi.updateCartItem(productId, quantity, size, color, token);
      
      if (response.success) {
        updateCartCount();
      } else {
        setError(response.message || 'Ошибка обновления количества');
        setCartItems(originalItems);
        setTotalPrice(originalTotal);
      }
    } catch (error) {
      setError('Ошибка обновления количества');
      setCartItems(originalItems);
      setTotalPrice(originalTotal);
    }
  };

  const removeItem = async (productId: number, size: string, color: string) => {
    if (!token) return;

    try {
      const response = await CartApi.removeFromCart(productId, size, color, token);
      
      if (response.success) {
        await loadCart();
        updateCartCount();
      } else {
        setError(response.message || 'Ошибка удаления товара');
      }
    } catch (error) {
      setError('Ошибка удаления товара');
    }
  };

  const clearCart = async () => {
    if (!token) return;

    try {
      const response = await CartApi.clearCart(token);
      
      if (response.success) {
        setCartItems([]);
        setCategories([]);
        setTotalPrice(0);
        updateCartCount();
      } else {
        setError(response.message || 'Ошибка очистки корзины');
      }
    } catch (error) {
      setError('Ошибка очистки корзины');
    }
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.cartContainer}>
          <div className={styles.loading}>Загрузка корзины...</div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.cartContainer}>
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={loadCart} className={styles.retryBtn}>
              Попробовать снова
            </button>
          </div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className={styles.main}>
        <CatalogHeader />
        <div className={styles.cartContainer}>
          <div className={styles.emptyCart}>
            <h2>Корзина пуста</h2>
            <p>Добавьте товары в корзину для продолжения покупок</p>
            <Link href="/" className={styles.continueShoppingBtn}>
              Перейти к покупкам
            </Link>
          </div>
        </div>
        <AtlasFooter />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <CatalogHeader />
      <div className={styles.cartContainer}>
        <CartContent 
          cartItems={cartItems}
          categories={categories}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
        />
        <CartSummary total={totalPrice} />
      </div>
      <AtlasFooter />
    </main>
  );
} 