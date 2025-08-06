const WORDPRESS_API_URL = 'https://test.devdenis.ru/wp-json';

export class WordPressAPI {
  // Отправка SMS кода
  static async sendSmsCode(phone: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/sms/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка отправки SMS');
    }
  }

  // Проверка SMS кода и авторизация
  static async verifySmsCode(phone: string, code: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка авторизации');
    }
  }

  // Получение профиля пользователя
  static async getUserProfile(token: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения профиля');
    }
  }

  // Проверка токена
  static async checkToken(token: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      return false;
    }
  }

  // Выход из системы
  static logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('atlas_token');
      localStorage.removeItem('atlas_user');
    }
  }

  // Сохранение данных пользователя
  static saveUserData(token: string, userData: unknown) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('atlas_token', token);
      localStorage.setItem('atlas_user', JSON.stringify(userData));
    }
  }

  // Получение сохраненных данных пользователя
  static getSavedUserData() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('atlas_user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Получение сохраненного токена
  static getSavedToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('atlas_token');
    }
    return null;
  }

  // Сохранение профиля пользователя
  static async saveUserProfile(token: string, profileData: unknown) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/user/profile/save`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка сохранения профиля');
    }
  }

  // Загрузка профиля пользователя
  static async loadUserProfile(token: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/user/profile/load`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка загрузки профиля');
    }
  }

  // Добавление товара в избранное
  static async addToWishlist(token: string, productId: number) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/wishlist/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка добавления в избранное');
    }
  }

  // Удаление товара из избранного
  static async removeFromWishlist(token: string, productId: number) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/wishlist/remove`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка удаления из избранного');
    }
  }

  // Получение избранного пользователя
  static async getWishlist(token: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/wishlist`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения избранного');
    }
  }

  // Получение количества товаров в избранном
  static async getWishlistCount(token: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/wishlist/count`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения количества избранного');
    }
  }

  // Проверка статуса товара в избранном
  static async checkWishlistStatus(token: string, productId: number) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/wishlist/check?product_id=${productId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка проверки статуса избранного');
    }
  }

  // Добавление отзыва
  static async addReview(token: string, productId: number, rating: number, text: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/reviews/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          product_id: productId,
          rating: rating,
          text: text
        }),
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка добавления отзыва');
    }
  }

  // Получение отзывов пользователя
  static async getUserReviews(token: string) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/reviews/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения отзывов');
    }
  }

  // Получение отзывов товара
  static async getProductReviews(productId: number) {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}/atlas/v1/reviews/product/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Ошибка получения отзывов товара');
    }
  }
} 