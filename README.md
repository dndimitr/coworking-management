# Coworking Space Management System

An AI-powered coworking space management system with TuyaSmart IoT integration and payment processing.

## Features

- 📅 **Booking Management**: Calendar-based booking system with real-time availability
- 🏢 **Space Management**: Manage different types of workspaces (desks, offices, meeting rooms)
- 🔌 **IoT Device Control**: Integrate with TuyaSmart devices (lights, AC, locks, sensors)
- 💳 **Payment Processing**: Stripe and PayPal integration for payments
- 📊 **Analytics Dashboard**: Real-time analytics and reporting
- 👥 **Member Management**: Membership plans and user management
- 📱 **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **IoT Integration**: TuyaSmart Cloud API
- **Charts**: Recharts

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- TuyaSmart account (for IoT features)
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coworking-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/coworking"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# TuyaSmart (optional)
TUYA_CLIENT_ID="your-tuya-client-id"
TUYA_CLIENT_SECRET="your-tuya-client-secret"

# Stripe (optional)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

5. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

- Email: `admin@example.com`
- Password: `demo123`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Dashboard routes
│   ├── api/                # API routes
│   └── auth/               # Authentication pages
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── booking/            # Booking components
│   ├── devices/            # IoT device components
│   └── payments/           # Payment components
├── lib/                    # Utilities and configurations
│   ├── prisma.ts           # Database client
│   ├── auth.ts             # NextAuth configuration
│   ├── tuya/               # TuyaSmart integration
│   └── stripe/             # Stripe integration
└── prisma/
    └── schema.prisma       # Database schema
```

## Database Schema

The system uses PostgreSQL with the following main entities:

- **User**: User accounts with roles
- **Space**: Workspace spaces (desks, offices, meeting rooms)
- **Booking**: Space bookings
- **Device**: IoT devices (TuyaSmart)
- **Payment**: Payment transactions
- **Membership**: Membership plans

## IoT Integration

The system integrates with TuyaSmart devices:

- Light control (on/off, brightness, color)
- AC control (temperature, mode)
- Smart locks (remote unlock)
- Motion/presence sensors
- Energy monitoring

To enable IoT features:
1. Create a TuyaSmart account
2. Add devices to your TuyaSmart account
3. Configure API credentials in `.env.local`

## Payment Integration

The system supports multiple payment methods:

- Credit/Debit cards (Stripe)
- PayPal
- Bank transfers

To enable payments:
1. Create a Stripe account
2. Add your Stripe API keys to `.env.local`
3. Configure webhook endpoints

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Database Migrations
```bash
npx prisma migrate dev
```

### Generating Prisma Client
```bash
npx prisma generate
```

## Deployment

The application can be deployed to:

- **Vercel** (recommended for frontend)
- **Railway** or **Supabase** (for PostgreSQL)
- **AWS**, **GCP**, or **Azure** (for full-stack)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
