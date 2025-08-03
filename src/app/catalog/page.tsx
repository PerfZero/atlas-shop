import CatalogHeader from '../../components/CatalogHeader';
import CatalogNavigation from '../../components/CatalogNavigation';
import ProductGrid from '../../components/ProductGrid';
import PartnersSection from '../../components/PartnersSection';
import PlatformSection from '../../components/PlatformSection';
import AtlasFooter from '../../components/AtlasFooter';
import styles from './page.module.css';

const abayaProducts = [
  {
    id: 1,
    name: "Dubai Umbrella Abaya Samiha Gray",
    price: "₸ 240 000",
    store: "NEYSS",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 2,
    name: "Dubai Umbrella Abaya Samiha Gray",
    price: "₸ 240 000",
    store: "NEYSS",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 3,
    name: "Dubai Umbrella Abaya Samiha Gray",
    price: "₸ 240 000",
    store: "NEYSS",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 4,
    name: "Dubai Umbrella Abaya Samiha Gray",
    price: "₸ 240 000",
    store: "NEYSS",
    image: "/product_1.png",
    isFavorite: false
  }
];

const dressesProducts = [
  {
    id: 5,
    name: "Elegant Evening Dress Black",
    price: "₸ 180 000",
    store: "FASHION HOUSE",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 6,
    name: "Casual Summer Dress Blue",
    price: "₸ 120 000",
    store: "FASHION HOUSE",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 7,
    name: "Formal Business Dress Gray",
    price: "₸ 200 000",
    store: "FASHION HOUSE",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 8,
    name: "Party Dress Red",
    price: "₸ 160 000",
    store: "FASHION HOUSE",
    image: "/product_1.png",
    isFavorite: false
  }
];

const hijabProducts = [
  {
    id: 9,
    name: "Silk Hijab Scarf Black",
    price: "₸ 45 000",
    store: "MODEST FASHION",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 10,
    name: "Cotton Hijab Scarf White",
    price: "₸ 35 000",
    store: "MODEST FASHION",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 11,
    name: "Printed Hijab Scarf Blue",
    price: "₸ 55 000",
    store: "MODEST FASHION",
    image: "/product_1.png",
    isFavorite: false
  },
  {
    id: 12,
    name: "Luxury Hijab Scarf Gold",
    price: "₸ 75 000",
    store: "MODEST FASHION",
    image: "/product_1.png",
    isFavorite: false
  }
];

export default function CatalogPage() {
  return (
    <main className={styles.main}>
      <CatalogHeader />
      <CatalogNavigation />
      <ProductGrid title="Абайя" products={abayaProducts} />
      <ProductGrid title="Платья" products={dressesProducts} />
      <ProductGrid title="Платки и хиджабы" products={hijabProducts} />
      <PartnersSection />
      <PlatformSection />
      <AtlasFooter />
    </main>
  );
} 