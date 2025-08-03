'use client';

import { useState } from 'react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [showSmsField, setShowSmsField] = useState(false);
  const [smsError, setSmsError] = useState('');

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `+7 (${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(0, 3)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 8)}`;
    return `+7 (${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handlePhoneSubmit = () => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length >= 10) {
      setShowSmsField(true);
    }
  };

  const handleSmsSubmit = () => {
    if (smsCode === '12345') {
      setSmsError('Неверный код');
    } else if (smsCode === '1234') {
      // Успешная авторизация с правильным кодом
      onClose();
      window.location.href = '/profile';
    } else if (smsCode.length > 0) {
      setSmsError('Неверный код');
    }
  };

  const handleResendCode = () => {
    setSmsError('');
    setSmsCode('');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>Идентификация</h2>

          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="phone">Номер телефона *</label>
                             <input
                 type="tel"
                 id="phone"
                 value={phone}
                 onChange={handlePhoneChange}
                 placeholder="+7 (---) --- -- --"
                 className={styles.input}
               />
            </div>

            {showSmsField && (
              <div className={styles.field}>
                <label htmlFor="sms">Код из СМС *</label>
                <input
                  type="text"
                  id="sms"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                  placeholder="Введите код"
                  className={`${styles.input} ${smsError ? styles.inputError : ''}`}
                />
                {smsError && (
                  <div className={styles.errorMessage}>
                    {smsError}
                  </div>
                )}
                <button className={styles.resendButton} onClick={handleResendCode}>
                  Отправить код повторно
                </button>
              </div>
            )}

            <div className={styles.requiredFields}>
              * Обязательные поля
            </div>

            <button 
              className={styles.submitButton}
              onClick={showSmsField ? handleSmsSubmit : handlePhoneSubmit}
            >
              Войти или Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 