'use client';

import { useState } from 'react';
import CatalogHeader from '../../components/CatalogHeader';
import CheckoutSteps from '../../components/CheckoutSteps';
import CheckoutSummary from '../../components/CheckoutSummary';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribeToEmails, setSubscribeToEmails] = useState(true);

  const cartItems = [
    {
      id: 1,
      name: "NOMADMOOD ASAR UME STYLE",
      price: 19990,
      image: "/product_1.png",
      quantity: 1
    },
    {
      id: 2,
      name: "NOMADMOOD ASAR UME STYLE",
      price: 19990,
      image: "/product_1.png",
      quantity: 1
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <main className={styles.main}>
      <CatalogHeader />
      <div className={styles.checkoutContainer}>
        <CheckoutSteps 
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          email={email}
          setEmail={setEmail}
          subscribeToEmails={subscribeToEmails}
          setSubscribeToEmails={setSubscribeToEmails}
        />
        <CheckoutSummary 
          cartItems={cartItems}
          total={total}
        />
      </div>
      <AtlasFooter />
    </main>
  );
} 