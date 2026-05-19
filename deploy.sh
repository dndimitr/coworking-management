#!/bin/bash

echo "🚀 Coworking Management System - Deployment Script"
echo "=================================================="
echo ""
echo "This script will help you deploy to Vercel."
echo ""
echo "Choose your deployment method:"
echo "1. Deploy via Vercel Web Interface (Recommended)"
echo "2. Deploy via Vercel CLI (requires login)"
echo "3. Build locally and prepare for manual upload"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📋 Steps for Vercel Web Interface:"
        echo "1. Go to https://vercel.com"
        echo "2. Click 'Add New Project'"
        echo "3. Import from GitHub: dndimitr/coworking-management"
        echo "4. Configure environment variables when prompted"
        echo "5. Click 'Deploy'"
        echo ""
        echo "🔗 Environment variables to add:"
        echo "NEXTAUTH_URL=https://your-app.vercel.app"
        echo "NEXTAUTH_SECRET=your-secret-key-min-32-chars"
        echo ""
        echo "Opening Vercel in your browser..."
        sleep 2
        open "https://vercel.com/new/clone?repository-url=https://github.com/dndimitr/coworking-management" || echo "Please open: https://vercel.com"
        ;;

    2)
        echo ""
        echo "Installing Vercel CLI..."
        npm i -g vercel
        echo ""
        echo "Please login to Vercel (this will open a browser):"
        vercel login
        echo ""
        echo "Deploying to production..."
        vercel --prod
        ;;

    3)
        echo ""
        echo "Building project for production..."
        npm run build
        echo ""
        echo "✅ Build complete!"
        echo "📁 Build output is in .next/ directory"
        echo ""
        echo "You can:"
        echo "1. Upload the .next folder to any Node.js hosting"
        echo "2. Use 'npm start' to run locally on port 3000"
        echo "3. Zip and upload to a VPS with Node.js installed"
        ;;

    *)
        echo "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process initiated!"
echo "📋 After deployment, visit: https://your-app.vercel.app"
echo "🔐 Demo credentials: admin@example.com / demo123"