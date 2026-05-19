#!/bin/bash

echo "🚀 Отваряне на Vercel Deploy..."
echo ""
echo "Ще се отвори: https://vercel.com/new/clone?repository-url=https://github.com/dndimitr/coworking-management"
echo ""

# Опитваме да отворим браузъра
if command -v xdg-open > /dev/null; then
    xdg-open "https://vercel.com/new/clone?repository-url=https://github.com/dndimitr/coworking-management"
elif command -v open > /dev/null; then
    open "https://vercel.com/new/clone?repository-url=https://github.com/dndimitr/coworking-management"
else
    echo "Моля, отворете този линк ръчно:"
    echo "https://vercel.com/new/clone?repository-url=https://github.com/dndimitr/coworking-management"
fi

echo "✅ Готово! Следвайте инструкциите в браузъра."