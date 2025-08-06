import { useState, useEffect } from 'react';
import { WordPressAPI } from '../services/wordpressApi';

interface User {
  id: number;
  phone: string;
  email?: string;
  created?: string;
  firstName?: string;
  lastName?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = WordPressAPI.getSavedToken();
      const savedUser = WordPressAPI.getSavedUserData();



      if (token && savedUser) {
        // Проверяем валидность токена и получаем актуальные данные пользователя
        const profileResult = await WordPressAPI.getUserProfile(token);
        
        if (profileResult.success) {
          // Обновляем данные пользователя в localStorage
          WordPressAPI.saveUserData(token, profileResult.user);
          setUser(profileResult.user);
          setIsAuthenticated(true);
        } else {
          // Токен недействителен, очищаем данные
          WordPressAPI.logout();
        }
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
      WordPressAPI.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone: string, code: string) => {
    try {
      const result = await WordPressAPI.verifySmsCode(phone, code);
      
      if (result.success) {
        WordPressAPI.saveUserData(result.token, result.user);
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: 'Ошибка авторизации' };
    }
  };

  const logout = () => {
    WordPressAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const sendSmsCode = async (phone: string) => {
    try {
      const result = await WordPressAPI.sendSmsCode(phone);
      return result;
    } catch (error: unknown) {
      console.error('SMS Error:', error);
      if ((error as Error)?.message) {
        throw new Error((error as Error).message);
      }
      throw new Error('Ошибка отправки SMS');
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    token: WordPressAPI.getSavedToken(),
    login,
    logout,
    sendSmsCode,
    checkAuth
  };
} 