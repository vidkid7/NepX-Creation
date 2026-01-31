---
name: NepX Creation Website
overview: Build a premium, ultra-modern IT company website for NepX Creation with dark theme, advanced animations, Spline 3D integration, and a full admin CMS panel using Next.js 14, Prisma, PostgreSQL, and Framer Motion.
todos:
  - id: setup-project
    content: Initialize Next.js 14 project with TypeScript, Tailwind CSS, and project structure
    status: completed
  - id: setup-database
    content: Configure Prisma with PostgreSQL schema and seed initial data
    status: completed
  - id: design-system
    content: "Create design system: colors, typography, glassmorphism components, animation utilities"
    status: completed
  - id: ui-components
    content: "Build reusable UI components: Button, Card, Input, Modal, AnimatedIcon, GlassCard, ParticleBackground"
    status: completed
  - id: hero-section
    content: Build Hero section with Spline 3D integration, animated text, and gradient backgrounds
    status: completed
  - id: public-pages
    content: "Create all public pages: About, Services, Portfolio, Contact with scroll animations"
    status: completed
  - id: background-animations
    content: "Implement IT-style background animations: particles, network lines, floating tech shapes"
    status: completed
  - id: admin-auth
    content: Set up NextAuth.js authentication with protected admin routes
    status: completed
  - id: admin-dashboard
    content: Build Admin Dashboard with content management, service CRUD, portfolio management
    status: completed
  - id: admin-settings
    content: Create settings panel for colors, fonts, SEO metadata, and site configuration
    status: completed
  - id: polish-optimize
    content: "Final polish: performance optimization, SEO, responsive testing, accessibility"
    status: completed
isProject: false
---

# NepX Creation - Premium IT Company Website

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom CSS for glassmorphism
- **Animations**: Framer Motion + GSAP for advanced effects
- **3D Elements**: Spline (embedded as specified)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (for admin panel)
- **Deployment**: Vercel (recommended)
- **Icons**: Lucide React + custom animated SVGs

## Project Structure

```
nepx-creation/
├── app/
│   ├── (public)/           # Public-facing pages
│   │   ├── page.tsx        # Homepage with hero + Spline
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   └── contact/
│   ├── admin/              # Admin dashboard (protected)
│   │   ├── dashboard/
│   │   ├── content/
│   │   ├── services/
│   │   ├── portfolio/
│   │   └── settings/
│   ├── api/                # API routes
│   └── layout.tsx
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── sections/           # Page sections
│   ├── animations/         # Animation wrappers
│   └── admin/              # Admin components
├── lib/
│   ├── prisma.ts           # Database client
│   └── auth.ts             # Auth configuration
├── prisma/
│   └── schema.prisma       # Database schema
└── public/
    └── assets/
```

## Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(ADMIN)
}

model SiteContent {
  id        String   @id @default(cuid())
  section   String   @unique
  content   Json
  updatedAt DateTime @updatedAt
}

model Service {
  id          String  @id @default(cuid())
  title       String
  description String
  icon        String
  features    Json
  order       Int
  active      Boolean @default(true)
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  image       String
  category    String
  technologies Json
  link        String?
  featured    Boolean  @default(false)
}

model Testimonial {
  id       String  @id @default(cuid())
  name     String
  company  String
  quote    String
  image    String?
  rating   Int
  active   Boolean @default(true)
}

model SiteSettings {
  id          String @id @default(cuid())
  key         String @unique
  value       Json
}
```

## Key Features Implementation

### 1. Hero Section with Spline 3D

```tsx
// Left side: Animated text + CTA
// Right side: Spline 3D viewer (embedded)
<spline-viewer url="https://prod.spline.design/nDuvhS2MLQg-hXjT/scene.splinecode" />
```

### 2. Animation System

- **Framer Motion**: Page transitions, scroll reveals, hover effects
- **GSAP**: Complex timeline animations, particle effects
- **CSS**: GPU-accelerated transforms, glassmorphism

### 3. Design System

- **Colors**: 
  - Background: `#000000` to `#0a0a0a`
  - Accent: Electric blue `#00d4ff` / Purple `#8b5cf6`
  - Glass: `rgba(255,255,255,0.05)` with blur
- **Typography**: Inter (clean) + Space Grotesk (tech headings)
- **Effects**: Glow, glassmorphism, gradient borders

### 4. Admin Panel Features

- Dashboard with analytics overview
- Content editor for all sections
- Service management (CRUD)
- Portfolio management with image upload
- Testimonial management
- Site settings (colors, fonts, SEO metadata)
- Secure authentication with session management

## Page Breakdown

### Public Pages


| Page      | Key Sections                                                   |
| --------- | -------------------------------------------------------------- |
| Home      | Hero + Spline, Services preview, Featured projects, Stats, CTA |
| About     | Company story, Team, Mission/Vision, Timeline                  |
| Services  | Service cards with animated icons, detailed descriptions       |
| Portfolio | Filterable grid, hover previews, case studies                  |
| Contact   | Form, Map, Contact info, Social links                          |


### Admin Pages


| Page         | Functionality                         |
| ------------ | ------------------------------------- |
| Dashboard    | Stats, recent activity, quick actions |
| Content      | Edit hero, about, and static content  |
| Services     | Add/edit/delete/reorder services      |
| Portfolio    | Manage projects with image upload     |
| Testimonials | Manage client testimonials            |
| Settings     | Colors, fonts, SEO, site metadata     |


## Animation Specifications

- **Page Transitions**: Smooth fade + slide (300ms)
- **Scroll Reveals**: Staggered fade-in with intersection observer
- **Hover Effects**: Scale (1.02-1.05), glow, gradient shift
- **Background**: Floating particles, network grid lines
- **Icons**: SVG morph/glow on hover
- **Cards**: 3D tilt effect, glass reflection

## Performance Optimizations

- Next.js Image optimization with lazy loading
- Dynamic imports for heavy components
- CSS `will-change` for animated elements
- Intersection Observer for scroll animations
- Debounced resize handlers
- Font optimization with `next/font`

## Security

- NextAuth.js with secure session handling
- Password hashing with bcrypt
- API route protection middleware
- CSRF protection
- Input sanitization
- Rate limiting on auth routes

## Deployment Configuration

- Vercel deployment with environment variables
- PostgreSQL on Railway/Supabase/Neon (free tier)
- Automatic preview deployments
- Edge caching for static assets

