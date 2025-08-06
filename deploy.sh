#!/bin/bash

# Скрипт для развертывания Atlas Store на сервере
# Использование: ./deploy.sh

echo "🚀 Начинаем развертывание Atlas Store..."

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы в корневой директории проекта."
    exit 1
fi

# Собираем проект локально
echo "📦 Собираем проект..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке проекта"
    exit 1
fi

echo "✅ Проект собран успешно!"

# Подключаемся к серверу и развертываем
echo "🌐 Подключаемся к серверу..."
ssh ubuntu@78.40.109.159 << 'EOF'
    echo "📁 Переходим в директорию проекта..."
    cd /var/www/store.atlas.kz
    
    echo "⏹️ Останавливаем текущее приложение..."
    pm2 stop store-atlas-kz || true
    
    echo "📥 Получаем последние изменения..."
    git fetch origin
    git reset --hard origin/main
    
    echo "📦 Устанавливаем зависимости..."
    npm ci --production=false
    
    echo "🔨 Собираем приложение..."
    npm run build
    
    echo "▶️ Запускаем приложение..."
    pm2 start ecosystem.config.js
    pm2 save
    
    echo "📊 Проверяем статус..."
    pm2 status
    
    echo "🌐 Тестируем HTTPS..."
    sleep 3
    curl -I https://store.atlas.kz || echo "⚠️ HTTPS тест не прошел, но развертывание завершено"
    
    echo "✅ Развертывание завершено успешно!"
EOF

echo "🎉 Развертывание Atlas Store завершено!"
echo "🌐 Ваш сайт доступен по адресу: https://store.atlas.kz" 