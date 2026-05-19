#!/bin/bash

# Директен deployment скрипт за Vercel

echo "🚀 Coworking Management System - Vercel Deployment"
echo "==================================================="
echo ""

# Проверяваме дали има VERCEL_TOKEN
if [ -z "$VERCEL_TOKEN" ]; then
    echo "⚠️  VERCEL_TOKEN не е наличен."
    echo ""
    echo "Ще използваме GitHub интеграция за deployment."
    echo ""
    echo "📋 Инструкции за директен deploy:"
    echo ""
    echo "1. Отидете на: https://vercel.com/new"
    echo ""
    echo "2. Изберете 'Import Git Repository'"
    echo ""
    echo "3. Въведете: https://github.com/dndimitr/coworking-management"
    echo ""
    echo "4. Натиснете 'Import'"
    echo ""
    echo "5. Добавете Environment Variables:"
    echo "   NEXTAUTH_URL=https://your-project.vercel.app"
    echo "   NEXTAUTH_SECRET=your-secret-key-min-32-chars"
    echo ""
    echo "6. Натиснете 'Deploy'"
    echo ""
    echo "✅ Проектът ще бъде live за няколко минути!"
    echo ""
    echo "🎯 Или използвайте бързия линк:"
    echo "https://vercel.com/new/clone?repository-url=https://github.com/dndimitr/coworking-management"
    echo ""
    exit 0
fi

echo "✅ VERCEL_TOKEN е наличен."
echo "🔄 Започваме deployment..."
echo ""

# Проверяваме дали има .vercel/project.json
if [ ! -f ".vercel/project.json" ]; then
    echo "📦 Инициализиране на Vercel проект..."

    # Създаваме Vercel проект чрез API
    PROJECT_RESPONSE=$(curl -s -X POST "https://api.vercel.com/v9/projects" \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "coworking-management",
            "framework": "nextjs"
        }')

    echo "Отговор от API: $PROJECT_RESPONSE"
fi

# Deploy
echo "🚀 Deploying..."
vercel --token "$VERCEL_TOKEN" --prod --yes

echo ""
echo "✅ Deployment завършен!"