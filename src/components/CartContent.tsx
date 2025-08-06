'use client';

import { useState } from 'react';
import styles from './CartContent.module.css';

interface CartItem {
  id: number;
  sku?: string;
  name: string;
  color: string;
  size: string;
  price: string;
  price_numeric: number;
  quantity: number;
  image: string | null;
  store: string;
  total_price: string;
  total_price_numeric: number;
}

interface Category {
  name: string;
  count: number;
  total: number;
}

interface CartContentProps {
  cartItems: CartItem[];
  categories: Category[];
  onUpdateQuantity: (productId: number, quantity: number, size: string, color: string) => void;
  onRemoveItem: (productId: number, size: string, color: string) => void;
  onClearCart: () => void;
}

export default function CartContent({ 
  cartItems, 
  categories, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart
}: CartContentProps) {
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    
    const itemKey = `${item.id}-${item.size}-${item.color}`;
    setUpdatingItems(prev => new Set(prev).add(itemKey));
    
    try {
      await onUpdateQuantity(item.id, newQuantity, item.size, item.color);
    } catch (error) {
      console.error('Ошибка при обновлении количества:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
    }
  };

  const toggleDropdown = (itemKey: string) => {
    setOpenDropdowns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  const selectQuantity = (item: CartItem, quantity: number) => {
    handleQuantityChange(item, quantity);
    toggleDropdown(`${item.id}-${item.size}-${item.color}`);
  };

  return (
    <div className={styles.cartContent}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Моя корзина</h1>
        <div className={styles.titleActions}>
          <button onClick={onClearCart} className={styles.clearCartBtn}>
            Очистить корзину
          </button>
          <button className={styles.continueShoppingBtn}>
            Продолжить покупки
          </button>
        </div>
      </div>
      
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <div key={index} className={styles.category}>
            <span className={styles.categoryName}>{category.name}</span>
            <span className={styles.categoryCount}>
              {category.count} товаров
              {category.total && ` - ${category.total.toLocaleString()} ₸`}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.itemsList}>
        {cartItems.map((item) => {
          const itemKey = `${item.id}-${item.size}-${item.color}`;
          const isUpdating = updatingItems.has(itemKey);
          const isDropdownOpen = openDropdowns.has(itemKey);
          
          return (
            <div key={itemKey} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <img src={item.image || ''} alt={item.name} />
              <button className={styles.zoomButton}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                    <div className={styles.itemSku}>{item.sku || ''}</div>
                    <h3 className={styles.itemName}>{item.name}</h3>
                </div>
                
                <div className={styles.itemContent}>
                    <div className={styles.itemSpecs}>
                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>Цвет:</span>
                            <span className={styles.specValue}>{item.color}</span>
                        </div>
                        <div className={styles.specItem}>
                            <span className={styles.specLabel}>Размер:</span>
                            <span className={styles.specValue}>{item.size}</span>
                        </div>
                    </div>
                    
                      <div className={styles.itemQuantityPrice}>
                                                     <div className={styles.itemQuantity}>
                               <div className={styles.customSelect}>
                                   <button 
                                       className={styles.selectButton}
                                       onClick={() => toggleDropdown(itemKey)}
                                       disabled={isUpdating}
                                   >
                                       <span>{item.quantity}</span>
                                       <svg 
                                           className={`${styles.arrow} ${isDropdownOpen ? styles.arrowUp : ''}`}
                                           width="12" 
                                           height="8" 
                                           viewBox="0 0 12 8" 
                                           fill="none"
                                       >
                                           <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                       </svg>
                                   </button>
                                   {isDropdownOpen && (
                                       <div className={styles.dropdown}>
                                           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                               <button
                                                   key={num}
                                                   className={`${styles.option} ${item.quantity === num ? styles.selected : ''}`}
                                                   onClick={() => selectQuantity(item, num)}
                                               >
                                                   {num}
                                               </button>
                                           ))}
                                       </div>
                                   )}
                               </div>
                           </div>
                        
                        <div className={styles.itemPrice}>
                            {item.price}
                        </div>
                    </div>
                </div>
                
                                 <div className={styles.itemActions}>
                     <a href={`/product/${item.id}`} className={styles.openProductBtn}>
                         Открыть товар
                     </a>
                     <button 
                         className={styles.removeBtn}
                         onClick={() => onRemoveItem(item.id, item.size, item.color)}
                         disabled={isUpdating}
                     >
                         Убрать из корзины
                     </button>
                 </div>
             </div>
           </div>
         );
       })}
      </div>
    </div>
  );
} 