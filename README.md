# NepX Creation - Premium IT Company Website

A modern, premium website for NepX Creation - a full-stack IT & digital solutions company. Built with Next.js 14, featuring a stunning dark theme, smooth animations, and a comprehensive admin panel.

## Features

### Public Website
- **Hero Section** with Spline 3D integration
- **About Section** with company story, mission, and vision
- **Services Section** with animated service cards
- **Portfolio Section** with filterable project grid
- **Why Choose Us** section highlighting company strengths
- **Technologies Section** showcasing the tech stack
- **Testimonials** with carousel display
- **Contact Section** with form submission
- **Particle background** with interactive network lines

### Admin Panel
- **Dashboard** with overview statistics
- **Content Management** for hero, about, and contact sections
- **Services Management** - CRUD operations for services
- **Portfolio Management** - Manage projects with images and categories
- **Testimonials Management** - Client reviews and ratings
- **Messages** - View and manage contact form submissions
- **Settings** - Theme colors, fonts, SEO metadata, social links
- **User Management** - Admin and editor roles

### Design Features
- Dark theme with glassmorphism effects
- Smooth micro-interactions and animations
- Gradient accents and glowing effects
- Fully responsive design
- Modern typography (Inter + Space Grotesk)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **3D Graphics**: Spline
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/nepx-creation.git
   cd nepx-creation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database URL and secrets:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/nepx_creation?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key"
   ```

4. Set up the database:
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

After seeding the database, you can access the admin panel at `/admin` with:
- **Email**: admin@nepxcreation.com
- **Password**: admin123

> **Important**: Change the admin password in production!

## Project Structure

```
nepx-creation/
├── app/
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── admin/             # Admin components
│   ├── animations/        # Animation wrappers
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   ├── sections/          # Page sections
│   └── ui/                # UI components
├── lib/
│   ├── auth.ts            # Auth config
│   ├── prisma.ts          # Database client
│   └── utils.ts           # Utility functions
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
└── types/                 # TypeScript types
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data

## Deployment

### Railway

1. **Create a Railway account** at [railway.app](https://railway.app) and install the GitHub integration if you use GitHub.

2. **New project**
   - Click **New Project** → **Deploy from GitHub repo** (or **Empty Project** and connect repo later).
   - Select this repository.

3. **Add PostgreSQL**
   - In the project, click **+ New** → **Database** → **PostgreSQL**.
   - Railway creates a Postgres service and sets `DATABASE_URL` automatically for services in the same project.

4. **Configure the app service**
   - Click your app service (the one from the repo).
   - Go to **Variables** and add:
     - `DATABASE_URL` – usually added automatically if you use “Add reference” and select the Postgres service. Otherwise copy the connection URL from the Postgres service’s **Variables** / **Connect** tab.
     - `NEXTAUTH_URL` – your app URL, e.g. `https://your-app-name.up.railway.app` (replace with the URL Railway shows for your app).
     - `NEXTAUTH_SECRET` – a long random string (e.g. run `openssl rand -base64 32` and paste the result).

5. **Deploy**
   - Railway runs `npm install`, `npm run build` (which includes `prisma generate`), and `npm start` automatically.
   - Wait for the first deploy to finish. Your app URL will look like `https://nepx-creation-production.up.railway.app`.

6. **Set up the database (first deploy only)**
   - In the app service, open **Settings** → **Deploy**.
   - Add a one-off **Deploy Command** or use Railway CLI in a one-off shell:
     ```bash
     npx prisma db push && npx prisma db seed
     ```
   - Or after the first deploy, open the **Shell** for your app service and run:
     ```bash
     npx prisma db push
     npx prisma db seed
     ```

7. **Admin login**
   - Go to `https://your-app-url.up.railway.app/admin`.
   - Log in with **admin@nepxcreation.com** / **admin123**, then change the password in production.

### Environment Variables for Production (Railway / any host)

| Variable           | Required | Example / note |
|--------------------|----------|----------------|
| `DATABASE_URL`     | Yes      | From Railway Postgres (or your DB). |
| `NEXTAUTH_URL`     | Yes      | `https://your-app.up.railway.app` |
| `NEXTAUTH_SECRET`  | Yes      | Long random string (e.g. `openssl rand -base64 32`) |
| `ADMIN_EMAIL`      | No       | Used by seed only. |
| `ADMIN_PASSWORD`   | No       | Used by seed only. |

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:
```ts
colors: {
  primary: {
    DEFAULT: "#00d4ff",
    // ...
  },
  accent: {
    DEFAULT: "#8b5cf6",
    // ...
  },
}
```

### Fonts

Fonts are configured in `app/layout.tsx` using `next/font/google`.

### Content

All content can be edited through the admin panel at `/admin`.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support or questions, contact: hello@nepxcreation.com
