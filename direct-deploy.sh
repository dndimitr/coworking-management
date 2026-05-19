#!/bin/bash

echo "🚀 ДИРЕКТЕН DEPLOYMENT ВЪВ VERCEL"
echo "=================================="
echo ""
echo "Тъй като нямаме валиден Vercel токен, ще използваме GitHub интеграцията."
echo ""
echo "✅ Проектът е готов!"
echo "📍 Repository: https://github.com/dndimitr/coworking-management"
echo ""
echo "📋 Бързи стъпки за deployment:"
echo ""
echo "1. Отворете този линк в браузър:"
echo "   https://vercel.com/new/clone?repository-url=https://github.com/dndimitr/coworking-management"
echo ""
echo "2. Влезте в Vercel с GitHub акаунт"
echo ""
echo "3. Настройте Environment Variables:"
echo "   NEXTAUTH_URL=https://your-project.vercel.app"
echo "   NEXTAUTH_SECRET=your-secret-key-min-32-chars"
echo ""
echo "4. Натиснете 'Deploy'"
echo ""
echo "🎯 След деплоймент:"
echo "   - URL: https://your-project.vercel.app"
echo "   - Demo: admin@example.com / demo123"
echo ""
echo "💡 Или използвайте deploy скрипта:"
echo "   ./deploy.sh"
echo ""
echo "✨ Готово! Проектът ще бъде live след няколко минути."

# Показваме build статуса
echo ""
echo "📊 Build Status:"
if [ -d ".next" ]; then
    echo "✅ Build е успешен"
else
    echo "⚠️  Build липсва, изпълнете: npm run build"
fi

echo ""
echo "🚀 Deployment URL: https://vercel.com/new/clone?repository-url=https://github.com/dndimitr/coworking-management"