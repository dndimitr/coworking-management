#!/bin/bash

# Production build script for Vercel deployment

echo "🚀 Starting production build..."

# Set a mock database URL for build time
export DATABASE_URL="postgresql://localhost:5432/coworking"
export NEXTAUTH_URL="https://localhost:3000"
export NEXTAUTH_SECRET="production-secret-key"

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Build the project
echo "🔨 Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📋 Next steps:"
    echo "1. Set up PostgreSQL database (Railway, Supabase, or Neon)"
    echo "2. Configure environment variables in Vercel"
    echo "3. Deploy to Vercel"
else
    echo "❌ Build failed!"
    exit 1
fi