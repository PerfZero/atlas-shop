'use client';

import styles from './CartSummary.module.css';

interface CartSummaryProps {
  total: number;
}

export default function CartSummary({ total }: CartSummaryProps) {
  const delivery = 0;
  const taxes = 0;
  const finalTotal = total + delivery + taxes;

  return (
    <div className={styles.cartSummary}>
      <div className={styles.summaryContent}>
        
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
        
        <a href="/checkout" className={styles.continueBtn}>
          Продолжить
        </a>
      </div>
    </div>
  );
} 