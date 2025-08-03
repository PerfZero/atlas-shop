'use client';

import { useState } from 'react';
import CatalogHeader from '../../components/CatalogHeader';
import CartContent from '../../components/CartContent';
import CartSummary from '../../components/CartSummary';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      sku: "1ABOF2",
      name: "NOMADMOOD ASAR UME STYLE",
      color: "Белый",
      size: "XL",
      price: 19990,
      quantity: 1,
      image: "/product_1.png",
      store: "Chic Boutique"
    },
    {
      id: 2,
      sku: "1ABOF2",
      name: "NOMADMOOD ASAR UME STYLE",
      color: "Белый",
      size: "XL",
      price: 19990,
      quantity: 1,
      image: "/product_1.png",
      store: "Chic Boutique"
    }
  ]);

  const [categories] = useState([
    { name: "Chic Boutique", count: 8, total: 120300 },
    { name: "Glamour Galore", count: 7, total: 110400 },
    { name: "Trendy Threads", count: 10, total: 95000 },
    { name: "Fashion Fusion", count: 6, total: 80150 },
    { name: "Style Haw", count: 9 }
  ]);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <main className={styles.main}>
      <CatalogHeader />
      <div className={styles.cartContainer}>
        <CartContent 
          cartItems={cartItems}
          categories={categories}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
        />
        <CartSummary total={total} />
      </div>
      <AtlasFooter />
    </main>
  );
} 