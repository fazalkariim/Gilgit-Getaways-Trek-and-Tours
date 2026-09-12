# Gilgit Trek & Tours

A modern full-stack tour and trekking website built for exploring and booking tours, expeditions, and adventure experiences across Gilgit-Baltistan and Pakistan.

The platform allows users to explore available tours, view pricing and trip details, create an account, and submit bookings online.

## Features

* Explore tours and trekking packages
* Expedition listings
* Tour details with location, duration, price, and description
* User authentication
* Online tour booking
* Booking price calculation
* User booking history
* Email notifications for bookings
* Responsive design for mobile, tablet, and desktop
* Dark mode support
* Prisma-powered database
* Next.js API routes

## Tech Stack

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Prisma ORM
* PostgreSQL
* React Hook Form
* Zod
* Nodemailer
* Lucide Icons

## Run Locally

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd YOUR_PROJECT_FOLDER
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` or `.env.local` file in the project root.

Example:

```env
DATABASE_URL="your_postgresql_database_url"

JWT_SECRET="your_secure_jwt_secret"

SMTP_HOST="your_smtp_host"
SMTP_PORT="587"
SMTP_USER="your_email"
SMTP_PASS="your_email_password"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

If Gemini/Google AI features are being used in the project, also add:

```env
GEMINI_API_KEY="your_gemini_api_key"
```

> Never upload `.env` or `.env.local` files to GitHub.

### 4. Setup Prisma

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

If the project includes seed data, run:

```bash
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Deployment

The project can be deployed using platforms such as:

* Railway
* Vercel
* Render

For production deployment, make sure the PostgreSQL database and all required environment variables are configured on the hosting platform.

For Prisma production migrations use:

```bash
npx prisma migrate deploy
```

### Expeditions

Adventure and mountaineering expeditions include:

* Expedition information
* Difficulty level
* Duration
* Location
* Pricing

### Booking System

Registered users can:

* Select a tour
* Choose number of persons
* Select number of days
* View calculated total price
* Confirm their booking
* View previous bookings

---

Built for exploring the mountains, valleys, culture, and adventures of Northern Pakistan.
