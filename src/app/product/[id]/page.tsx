'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import CatalogHeader from '../../../components/CatalogHeader';
import ProductDetail from '../../../components/ProductDetail';
import RelatedProducts from '../../../components/RelatedProducts';
import AtlasFooter from '../../../components/AtlasFooter';
import styles from './page.module.css';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  return (
    <main className={styles.main}>
      <CatalogHeader />
      <ProductDetail productId={productId} />
      <RelatedProducts />
      <AtlasFooter />
    </main>
  );
} 