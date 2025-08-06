import CatalogHeader from '../../components/CatalogHeader';
import CatalogNavigation from '../../components/CatalogNavigation';
import PartnersSection from '../../components/PartnersSection';
import PlatformSection from '../../components/PlatformSection';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

export default function CatalogPage() {
  return (
    <main className={styles.main}>
      <CatalogHeader />
      <CatalogNavigation />
      <PartnersSection />
      <PlatformSection />
      <AtlasFooter />
    </main>
  );
} 