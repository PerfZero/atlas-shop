'use client';

import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useAuth } from '../hooks/useAuth';
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
  const { login, sendSmsCode } = useAuth();



  const handlePhoneSubmit = async () => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 11 && numbers.startsWith('7')) {
      try {
        const result = await sendSmsCode(numbers);
        if (result.success) {
          setShowSmsField(true);
          setSmsError(''); // Очищаем ошибки при успехе
        } else {
          setSmsError(result.message || 'Ошибка отправки SMS');
        }
      } catch (error: any) {
        console.error('Ошибка отправки SMS:', error);
        setSmsError(error.message || 'Ошибка отправки SMS');
      }
    } else {
      setSmsError('Введите корректный номер телефона');
    }
  };

  const handleSmsSubmit = async () => {
    try {
      const numbers = phone.replace(/\D/g, '');
      const result = await login(numbers, smsCode);
      
      if (result.success) {
        onClose();
        window.location.href = '/profile';
      } else {
        setSmsError(result.message || 'Неверный код');
      }
    } catch (error) {
      setSmsError('Ошибка авторизации');
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
               <IMaskInput
                 mask="+7 (000) 000-00-00"
                 value={phone}
                 onAccept={(value) => setPhone(value)}
                 placeholder="+7 (___) ___-__-__"
                 className={styles.input}
                 unmask={false}
               />
               {smsError && !showSmsField && (
                 <div className={styles.errorMessage}>
                   {smsError}
                 </div>
               )}
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