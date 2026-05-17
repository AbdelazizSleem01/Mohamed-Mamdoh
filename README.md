# Mohamed Mamdouh Portfolio

Professional portfolio website for **Mohamed Mamdouh Khairy Abdelkawy** built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and modern UI components.

## Overview

This project showcases:
- Professional summary
- Skills & expertise
- Experience and education
- Certifications and services
- Contact section with form submission endpoint

It includes polished animations, responsive layout, dark/light mode toggle, social links, SEO metadata, and a full admin CMS.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- SweetAlert2
- Prisma ORM
- PostgreSQL (Neon)
- Nodemailer (optional real email sending)

## Features

- Fully responsive portfolio layout
- Animated Hero section and enhanced UI interactions
- Styled navigation with icons and hover animations
- Improved footer design with credit link
- Contact form with API endpoint
- Contact form **Mock Mode** for demos
- Dynamic portfolio content stored in DB via Prisma
- Admin page to edit all content (`/admin`)
- Unified icon picker in admin
- SEO-ready metadata (Open Graph, Twitter, canonical, robots)
- Favicon and web manifest setup from `public/`

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://<user>:<pass>@<host>/<db>?sslmode=require

ADMIN_PANEL_USER=admin
ADMIN_PANEL_PASSWORD=change_this_strong_password

CONTACT_MOCK_MODE=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
CONTACT_TO_EMAIL=mohamedmamdouhkhairy2421@gmail.com
```

## Content Management

- Open: `http://localhost:3000/admin`
- Login with admin credentials
- Click `Load` to fetch latest data
- Edit sections and click `Save`

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:reset
```

## Deployment

Recommended: Vercel.

Before deploy:
- Set all required environment variables in Vercel
- Ensure `DATABASE_URL` points to Neon/Postgres
- Set strong admin credentials
- Set `CONTACT_MOCK_MODE=false` only if SMTP is configured

## Branding & Credits

- Site content: Mohamed Mamdouh
- Footer credit link: [Abdelaziz Sleem](https://abdelaziz-sleem.vercel.app/)

## License

Private project.
