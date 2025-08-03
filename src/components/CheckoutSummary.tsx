'use client';

import styles from './CheckoutSummary.module.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutSummaryProps {
  cartItems: CartItem[];
  total: number;
}

export default function CheckoutSummary({ cartItems, total }: CheckoutSummaryProps) {
  const delivery = 0;
  const taxes = 0;
  const finalTotal = total + delivery + taxes;

  return (
    <div className={styles.checkoutSummary}>
      <div className={styles.summaryHeader}>
        <h2 className={styles.summaryTitle}>Моя корзина ({cartItems.length})</h2>
        <button className={styles.changeItemsBtn}>Изменить товары</button>
      </div>

      <div className={styles.itemsList}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.summaryItem}>
            <div className={styles.itemImage}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <div className={styles.itemPrice}>〒 {item.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span>Итого</span>
          <span>〒 {total.toLocaleString()}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Доставка</span>
          <span>〒 {delivery.toLocaleString()}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Налоги/НДС</span>
          <span>〒 {taxes.toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.finalTotal}>
        <span>К оплате</span>
        <span>〒 {finalTotal.toLocaleString()}</span>
      </div>
    </div>
  );
} 