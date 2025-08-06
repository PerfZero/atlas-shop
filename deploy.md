# Инструкция по развертыванию Atlas Store

## Сервер настроен и готов к работе

**IP сервера:** 78.40.109.159  
**Домен:** store.atlas.kz  
**HTTPS:** ✅ Настроен и работает

## Что уже установлено на сервере:
- ✅ Ubuntu 24.04 LTS
- ✅ Node.js 20.19.4
- ✅ Nginx (прокси на порт 3000)
- ✅ PM2 (управление процессами)
- ✅ SSL сертификат Let's Encrypt
- ✅ UFW файрвол (порты 22, 80, 443 открыты)

## Как развернуть ваш проект:

### 1. Подключитесь к серверу:
```bash
ssh ubuntu@78.40.109.159
# Пароль: nLubYcep3sjQOV9PhKpyvSs=
```

### 2. Перейдите в директорию проекта:
```bash
cd /var/www/store.atlas.kz
```

### 3. Остановите текущий процесс:
```bash
pm2 stop store-atlas-kz
```

### 4. Клонируйте ваш репозиторий:
```bash
# Очистите текущую директорию (если нужно)
rm -rf .next node_modules package-lock.json

# Клонируйте ваш репозиторий
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .
```

### 5. Установите зависимости и соберите проект:
```bash
npm install
npm run build
```

### 6. Запустите приложение:
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 7. Проверьте статус:
```bash
pm2 status
curl -I https://store.atlas.kz
```

## Автоматическое развертывание (опционально):

Создайте GitHub Actions workflow для автоматического развертывания:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Server
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: 78.40.109.159
        username: ubuntu
        password: ${{ secrets.SERVER_PASSWORD }}
        script: |
          cd /var/www/store.atlas.kz
          pm2 stop store-atlas-kz
          git pull origin main
          npm install
          npm run build
          pm2 start ecosystem.config.js
          pm2 save
```

## Полезные команды:

```bash
# Проверить статус PM2
pm2 status

# Посмотреть логи
pm2 logs store-atlas-kz

# Перезапустить приложение
pm2 restart store-atlas-kz

# Проверить статус Nginx
systemctl status nginx

# Проверить SSL сертификат
certbot certificates
```

## Структура файлов на сервере:
```
/var/www/store.atlas.kz/
├── ecosystem.config.js    # PM2 конфигурация
├── package.json
├── src/
├── public/
└── .next/                 # Собранное приложение
```

## Доступ к сайту:
- **HTTP:** http://store.atlas.kz (редирект на HTTPS)
- **HTTPS:** https://store.atlas.kz ✅ 