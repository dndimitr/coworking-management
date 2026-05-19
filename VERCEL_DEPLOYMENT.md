# Vercel Deployment Guide

## Project Status: Ready for Deployment

The project has been pushed to GitHub: https://github.com/dndimitr/coworking-management

## Deployment Steps

### 1. Sign up for Vercel
- Go to https://vercel.com
- Sign up with your GitHub account

### 2. Import Project
1. Click "Add New Project"
2. Select "Import Git Repository"
3. Choose `dndimitr/coworking-management`
4. Click "Import"

### 3. Configure Environment Variables

Add these environment variables in Vercel:

```
# Database (use a PostgreSQL provider like Railway, Supabase, or Neon)
DATABASE_URL="postgresql://user:password@host:5432/coworking"

# NextAuth
NEXTAUTH_URL="https://your-project-name.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here"

# TuyaSmart (optional - for IoT features)
TUYA_CLIENT_ID="your-tuya-client-id"
TUYA_CLIENT_SECRET="your-tuya-client-secret"

# Stripe (optional - for payments)
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
```

### 4. Database Setup

You need a PostgreSQL database. Options:
- **Railway** (https://railway.app) - Free tier available
- **Supabase** (https://supabase.com) - Free tier available
- **Neon** (https://neon.tech) - Free tier available

Once you have the database:
1. Run migrations: `npx prisma migrate deploy`
2. Seed data (optional)

### 5. Deploy

Click "Deploy" in Vercel and wait for the build to complete.

## Demo Credentials

After deployment, you can sign in with:
- Email: `admin@example.com`
- Password: `demo123`

## Features

✅ Dashboard with real-time statistics
✅ Booking management system
✅ IoT device control (TuyaSmart ready)
✅ Payment processing (Stripe ready)
✅ Member management
✅ Space management
✅ Analytics dashboard
✅ Responsive design

## Tech Stack

- Next.js 14+ with TypeScript
- Tailwind CSS
- PostgreSQL with Prisma ORM
- NextAuth.js
- Stripe (payments)
- TuyaSmart Cloud API (IoT)

## Support

For issues or questions, please open an issue on GitHub.