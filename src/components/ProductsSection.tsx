'use client';

import styles from './ProductsSection.module.css';

export default function ProductsSection() {
  const products = [
    {
      name: "White Safa",
      category: "Абайя",
      price: "₸ 240 000",
      image: "/pic_1.png"
    },
    {
      name: "Gold Pray",
      category: "Жайнамазы",
      price: "₸ 19 000",
      image: "/pic_2.png"
    },
    {
      name: "Mosaic Drawer",
      category: "Финики",
      price: "₸ 265 100",
      image: "/pic_3.png"
    },
    {
      name: "Hasan Oud",
      category: "Бахур",
      price: "₸ 56 000",
      image: "/pic_4.png"
    }
  ];

  return (
    <section className={styles.products}>
      <h2 className={styles.productsTitle}>Ограниченное предложение</h2>
      <div className={styles.productsGrid}>
        {products.map((product, index) => (
          <div key={index} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
                <div className={styles.productNameContainer}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productCategory}>/ {product.category}</p>
              </div>
              <p className={styles.productPrice}>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.ctaContainer}>
        <a href="#" className={styles.ctaButton}>Перейти к покупкам</a>
      </div>
    </section>
  );
} 