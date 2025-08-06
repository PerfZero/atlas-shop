const WORDPRESS_API_URL = 'https://test.devdenis.ru/wp-json';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  count: number;
  image: string | null;
  show_in_navigation?: boolean;
  navigation_order?: number;
  parent_id?: number;
  children?: Category[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  content?: string;
  short_description?: string;
  price: string;
  regular_price?: string;
  sale_price?: string;
  image: string | null;
  gallery: string[];
  store: string;
  sku?: string;
  in_stock: boolean;
  featured: boolean;
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
  is_favorite: boolean;
  characteristics?: string[];
  attributes?: {
    sizes: Array<{ id: number; name: string; slug: string }>;
    colors: Array<{ id: number; name: string; slug: string }>;
    delivery_regions: Array<{ id: number; name: string; slug: string }>;
    delivery_times: Array<{ id: number; name: string; slug: string }>;
  };
  color_images?: Array<{
    color_name: string;
    color_slug: string;
    image: string;
  }>;
}

export interface CategoryProductsResponse {
  success: boolean;
  products: Product[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
  };
}

export interface CategoriesResponse {
  success: boolean;
  categories: Category[];
}

export interface CategoryResponse {
  success: boolean;
  category: Category;
}

export class CategoryAPI {
  // Получение всех категорий
  static async getCategories(): Promise<CategoriesResponse> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/categories`);
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения категорий');
    }
  }

  // Получение категорий для навигации
  static async getNavigationCategories(): Promise<CategoriesResponse> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/categories/navigation`);
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения категорий навигации');
    }
  }

  // Получение конкретной категории
  static async getCategory(id: number): Promise<CategoryResponse> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/categories/${id}`);
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения категории');
    }
  }

  // Получение товаров категории
  static async getCategoryProducts(
    categoryId: number, 
    page: number = 1, 
    perPage: number = 12,
    token?: string
  ): Promise<CategoryProductsResponse> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(
        `${WORDPRESS_API_URL}/atlas/v1/categories/${categoryId}/products?page=${page}&per_page=${perPage}`,
        { headers }
      );
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения товаров категории');
    }
  }

  // Поиск категории по названию
  static async findCategoryByName(name: string): Promise<Category | null> {
    try {
      const categories = await this.getCategories();
      if (categories.success) {
        return categories.categories.find(cat => cat.name === name) || null;
      }
      return null;
    } catch (error) {
      console.error('Ошибка поиска категории:', error);
      return null;
    }
  }

  // Получение дочерних категорий
  static async getCategoryChildren(parentId: number): Promise<{
    success: boolean;
    parent_category?: {
      id: number;
      name: string;
      slug: string;
    };
    children?: Category[];
    message?: string;
  }> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/categories/${parentId}/children`);
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения дочерних категорий');
    }
  }

  // Получение конкретного товара
  static async getProduct(productId: number, token?: string): Promise<{
    success: boolean;
    product?: Product;
    message?: string;
  }> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/products/${productId}`, { headers });
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения товара');
    }
  }

  // Получение размеров
  static async getSizes(): Promise<{
    success: boolean;
    sizes?: Array<{ id: number; name: string; slug: string }>;
    message?: string;
  }> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/attributes/sizes`);
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения размеров');
    }
  }

  // Получение цветов
  static async getColors(): Promise<{
    success: boolean;
    colors?: Array<{ id: number; name: string; slug: string }>;
    message?: string;
  }> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/attributes/colors`);
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения цветов');
    }
  }

  // Получение регионов доставки
  static async getDeliveryRegions(): Promise<{
    success: boolean;
    delivery_regions?: Array<{ id: number; name: string; slug: string }>;
    message?: string;
  }> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/attributes/delivery-regions`);
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения регионов доставки');
    }
  }

  // Получение сроков доставки
  static async getDeliveryTimes(): Promise<{
    success: boolean;
    delivery_times?: Array<{ id: number; name: string; slug: string }>;
    message?: string;
  }> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/attributes/delivery-times`);
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения сроков доставки');
    }
  }

  // Фильтрация товаров
  static async filterProducts(params: {
    category_id?: number;
    sizes?: number[];
    colors?: number[];
    delivery_regions?: number[];
    delivery_times?: number[];
    min_price?: number;
    max_price?: number;
    search?: string;
    page?: number;
    per_page?: number;
    token?: string;
  }): Promise<CategoryProductsResponse> {
    try {
      const searchParams = new URLSearchParams();
      
      if (params.category_id) searchParams.append('category_id', params.category_id.toString());
      if (params.sizes) searchParams.append('sizes', params.sizes.join(','));
      if (params.colors) searchParams.append('colors', params.colors.join(','));
      if (params.delivery_regions) searchParams.append('delivery_regions', params.delivery_regions.join(','));
      if (params.delivery_times) searchParams.append('delivery_times', params.delivery_times.join(','));
      if (params.min_price) searchParams.append('min_price', params.min_price.toString());
      if (params.max_price) searchParams.append('max_price', params.max_price.toString());
      if (params.search) searchParams.append('search', params.search);
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.per_page) searchParams.append('per_page', params.per_page.toString());

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (params.token) {
        headers['Authorization'] = `Bearer ${params.token}`;
      }

      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/products/filter?${searchParams.toString()}`, { headers });
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка фильтрации товаров');
    }
  }
} 