interface SMSCResponse {
  id?: string;
  cnt?: number;
  cost?: string;
  balance?: string;
  error?: string;
  error_code?: number;
}

export class SMSCAPI {
  private static readonly LOGIN = 'SattilyBro';
  private static readonly PASSWORD = 'pswForSmsc1!';
  private static readonly BASE_URL = 'https://smsc.kz/sys/send.php';

  // Отправка SMS
  static async sendSMS(phone: string, message: string, options: {
    sender?: string;
    flash?: boolean;
    translit?: number;
    charset?: string;
  } = {}) {
    const params = new URLSearchParams({
      login: this.LOGIN,
      psw: this.PASSWORD,
      phones: phone,
      mes: message,
      fmt: '3', // JSON формат
      charset: options.charset || 'utf-8'
    });

    if (options.sender) {
      params.append('sender', options.sender);
    }

    if (options.flash) {
      params.append('flash', '1');
    }

    if (options.translit) {
      params.append('translit', options.translit.toString());
    }

    try {
      const response = await fetch(`${this.BASE_URL}?${params.toString()}`);
      const result: SMSCResponse = await response.json();

      if (result.error) {
        throw new Error(`SMSC Error: ${result.error}`);
      }

      return {
        success: true,
        id: result.id,
        count: result.cnt,
        cost: result.cost,
        balance: result.balance
      };
    } catch (error) {
      console.error('SMSC API Error:', error);
      throw new Error('Ошибка отправки SMS');
    }
  }

  // Получение стоимости SMS
  static async getSMSCost(phone: string, message: string) {
    const params = new URLSearchParams({
      login: this.LOGIN,
      psw: this.PASSWORD,
      phones: phone,
      mes: message,
      cost: '1', // Получить стоимость
      fmt: '3' // JSON формат
    });

    try {
      const response = await fetch(`${this.BASE_URL}?${params.toString()}`);
      const result: SMSCResponse = await response.json();

      if (result.error) {
        throw new Error(`SMSC Error: ${result.error}`);
      }

      return {
        success: true,
        cost: result.cost,
        count: result.cnt
      };
    } catch (error) {
      console.error('SMSC Cost API Error:', error);
      throw new Error('Ошибка получения стоимости SMS');
    }
  }

  // Проверка баланса
  static async getBalance() {
    const params = new URLSearchParams({
      login: this.LOGIN,
      psw: this.PASSWORD,
      balance: '1',
      fmt: '3'
    });

    try {
      const response = await fetch(`${this.BASE_URL}?${params.toString()}`);
      const result: SMSCResponse = await response.json();

      if (result.error) {
        throw new Error(`SMSC Error: ${result.error}`);
      }

      return {
        success: true,
        balance: result.balance
      };
    } catch (error) {
      console.error('SMSC Balance API Error:', error);
      throw new Error('Ошибка получения баланса');
    }
  }

  // Отправка SMS с кодом подтверждения
  static async sendVerificationCode(phone: string, code: string) {
    const message = `Ваш код подтверждения: ${code}`;
    
    return this.sendSMS(phone, message, {
      sender: 'AtlasStore'
    });
  }
} 