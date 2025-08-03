'use client';

import styles from './CartContent.module.css';

interface CartItem {
  id: number;
  sku: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
}

interface Category {
  name: string;
  count: number;
  total?: number;
}

interface CartContentProps {
  cartItems: CartItem[];
  categories: Category[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export default function CartContent({ 
  cartItems, 
  categories, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartContentProps) {
  return (
    <div className={styles.cartContent}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Моя корзина</h1>
        <button className={styles.continueShoppingBtn}>
          Продолжить покупки
        </button>
      </div>
      
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <div key={index} className={styles.category}>
            <span className={styles.categoryName}>{category.name}</span>
            <span className={styles.categoryCount}>
              {category.count} товаров
              {category.total && ` - ${category.total.toLocaleString()} 〒`}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.itemsList}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <img src={item.image} alt={item.name} />
              <button className={styles.zoomButton}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.itemInfo}>
                <div className={styles.itemHeader}>
                    
           
              <div className={styles.itemSku}>{item.sku}</div>
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
                  <select 
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                    className={styles.quantitySelect}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div className={styles.itemPrice}>
                  〒 {item.price.toLocaleString()}
                </div>
              </div>
              </div>
              
              <div className={styles.itemActions}>
                <button className={styles.openProductBtn}>
                  Открыть товар
                </button>
                <button 
                  className={styles.removeBtn}
                  onClick={() => onRemoveItem(item.id)}
                >
                  Убрать из корзины
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 