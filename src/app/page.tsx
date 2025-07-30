import AtlasHeader from '../components/AtlasHeader';
import HeroSection from '../components/HeroSection';
import LimitedEditionSection from '../components/LimitedEditionSection';
import ProductsSection from '../components/ProductsSection';
import GiftsSection from '../components/GiftsSection';
import PartnersSection from '../components/PartnersSection';
import ExclusiveSafiSection from '../components/ExclusiveSafiSection';
import PlatformSection from '../components/PlatformSection';
import AtlasFooter from '../components/AtlasFooter';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <AtlasHeader />
      <HeroSection />
      
      <section className={styles.categories}>
        <h2 className={styles.categoriesTitle}>Категории</h2>
        <div className={styles.categoriesGrid}>
          {[
            { name: "Для женщин", image: "/pic_1.png" },
            { name: "Для мужчин", image: "/pic_2.png" },
            { name: "Финики", image: "/pic_3.png" },
            { name: "Жайнамазы", image: "/pic_4.png" },
            { name: "Картины", image: "/pic_5.png" },
            { name: "Подарочные боксы", image: "/pic_6.png" },
            { name: "Халяль БАДы", image: "/pic_7.png" },
            { name: "Хадж наборы", image: "/pic_8.png" }
          ].map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                <img src={category.image} alt={category.name} />
              </div>
              <h3 className={styles.categoryName}>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

            <LimitedEditionSection />
      <ProductsSection />
      <GiftsSection />
      <PartnersSection />
 
      <PlatformSection />
      <AtlasFooter />

 
    </main>
  );
}
