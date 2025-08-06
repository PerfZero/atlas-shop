import { Product } from './categoryApi';

export interface CartItem {
  id: number;
  name: string;
  sku?: string;
  store: string;
  image: string | null;
  price: string;
  price_numeric: number;
  quantity: number;
  size: string;
  color: string;
  added_at: string;
  total_price: string;
  total_price_numeric: number;
}

export interface CartResponse {
  success: boolean;
  cart: CartItem[];
  total_price: string;
  total_price_numeric: number;
  items_count: number;
}

export interface CartCountResponse {
  success: boolean;
  count: number;
}

export interface CartActionResponse {
  success: boolean;
  message: string;
  cart_count?: number;
}

export class CartApi {
  private static baseUrl = 'https://test.devdenis.ru/wp-json';

  static async addToCart(
    productId: number, 
    quantity: number = 1, 
    size?: string, 
    color?: string,
    token?: string
  ): Promise<CartActionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/atlas/v1/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          product_id: productId,
          quantity,
          size: size || '',
          color: color || ''
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
      return {
        success: false,
        message: 'Ошибка при добавлении в корзину'
      };
    }
  }

  static async getCart(token?: string): Promise<CartResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/atlas/v1/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении корзины:', error);
      return {
        success: false,
        cart: [],
        total_price: '0 ₸',
        total_price_numeric: 0,
        items_count: 0
      };
    }
  }

  static async updateCartItem(
    productId: number,
    quantity: number,
    size?: string,
    color?: string,
    token?: string
  ): Promise<CartActionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/atlas/v1/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          product_id: productId,
          quantity,
          size: size || '',
          color: color || ''
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при обновлении корзины:', error);
      return {
        success: false,
        message: 'Ошибка при обновлении корзины'
      };
    }
  }

  static async removeFromCart(
    productId: number,
    size?: string,
    color?: string,
    token?: string
  ): Promise<CartActionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/atlas/v1/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          product_id: productId,
          size: size || '',
          color: color || ''
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при удалении из корзины:', error);
      return {
        success: false,
        message: 'Ошибка при удалении из корзины'
      };
    }
  }

  static async clearCart(token?: string): Promise<CartActionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/atlas/v1/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
      return {
        success: false,
        message: 'Ошибка при очистке корзины'
      };
    }
  }

  static async getCartCount(token?: string): Promise<CartCountResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/atlas/v1/cart/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении количества товаров в корзине:', error);
      return {
        success: true,
        count: 0
      };
    }
  }

  static async getCartWithCategories(token?: string): Promise<CartResponse & { categories: unknown[] }> {
    try {
      const response = await fetch(`${this.baseUrl}/atlas/v1/cart/with-categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении корзины с категориями:', error);
      return {
        success: false,
        cart: [],
        categories: [],
        total_price: '0 ₸',
        total_price_numeric: 0,
        items_count: 0
      };
    }
  }
} 