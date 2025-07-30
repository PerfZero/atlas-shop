'use client';

import styles from './AtlasFooter.module.css';

export default function AtlasFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Поддержка клиентов и партнеров</h3>
            <p className={styles.contactInfo}>
              Наши консультанты по работе с клиентами готовы помочь Вам по телефону +7 700 000 00 07 или Вы можете связаться с нами в чате.
            </p>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.footerLink}>Часто задаваемые вопросы</a></li>
              <li><a href="#" className={styles.footerLink}>Доставка и возврат</a></li>
              <li><a href="#" className={styles.footerLink}>Контакты</a></li>
              <li><a href="#" className={styles.footerLink}>Условия партнерства</a></li>
              <li><a href="#" className={styles.footerLink}>Зарегистрироваться как продавец</a></li>
              <li><a href="#" className={styles.footerLink}>Политика конфиденциальности</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Категории</h3>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.footerLink}>Новые поступления</a></li>
              <li><a href="#" className={styles.footerLink}>Для женщин</a></li>
              <li><a href="#" className={styles.footerLink}>Для мужчин</a></li>
              <li><a href="#" className={styles.footerLink}>Финики</a></li>
              <li><a href="#" className={styles.footerLink}>Жайнамазы</a></li>
              <li><a href="#" className={styles.footerLink}>Картины</a></li>
              <li><a href="#" className={styles.footerLink}>Подарочные боксы</a></li>
              <li><a href="#" className={styles.footerLink}>Халяль БАДы и витамины</a></li>
              <li><a href="#" className={styles.footerLink}>Хадж наборы</a></li>
              <li><a href="#" className={styles.footerLink}>Limited Edition</a></li>
              <li><a href="#" className={styles.footerLink}>Магазины</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Социальные сети</h3>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.footerLink}>Instagram</a></li>
              <li><a href="#" className={styles.footerLink}>Telegram</a></li>
              <li><a href="#" className={styles.footerLink}>WhatsApp</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Подписка на новости</h3>
            <p className={styles.newsletterText}>
              <strong>Подпишитесь</strong> на эксклюзивные обновления по электронной почте и SMS и получайте последние новости от Atlas Store, включая новые поступления и эксклюзивные коллекции.
            </p>
          </div>
        </div>

        <div className={styles.footerDivider}></div>
        
        <div className={styles.footerLogo}>
          <span className={styles.logoText}>ATLAS</span>
          <span className={styles.logoDiamond}>♦</span>
          <span className={styles.logoText}>STORE</span>
        </div>
      </div>
    </footer>
  );
} 