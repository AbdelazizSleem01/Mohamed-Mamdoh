# Mohamed Mamdouh Portfolio

Professional portfolio website for **Mohamed Mamdouh Khairy Abdelkawy** built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and modern UI components.

## Overview

This project showcases:
- Professional summary
- Skills & expertise
- Experience and education
- Certifications and services
- Contact section with form submission endpoint

It includes polished animations, responsive layout, dark/light mode toggle, social links, and SEO metadata.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Nodemailer (contact email integration)
- Prisma (available in project dependencies)

## Features

- Fully responsive portfolio layout
- Animated Hero section and enhanced UI interactions
- Styled navigation with icons and hover animations
- Improved footer design with credit link
- Contact form with API endpoint
- Contact form **Mock Mode** for demos
- SEO-ready metadata (Open Graph, Twitter, canonical, robots)
- Favicon and web manifest setup from `public/`

## Project Structure

```txt
src/
  app/
    layout.tsx
    page.tsx
    api/
      route.ts
  components/
    portfolio/
      hero.tsx
      navbar.tsx
      skills.tsx
      experience.tsx
      contact.tsx
      footer.tsx
public/
  LOGO.png
  LOGO-light.png
  manifest.webmanifest
```

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
# Set your production URL when deploying
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Contact form mode
# true  -> mock success response (no real email sent)
# false -> send real email via SMTP
CONTACT_MOCK_MODE=true

# SMTP settings (used only when CONTACT_MOCK_MODE=false)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
CONTACT_TO_EMAIL=mohamedmamdouhkhairy2421@gmail.com
```

## Contact Form Behavior

Endpoint: `POST /api`

Payload:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Subject",
  "message": "Message body"
}
```

- If `CONTACT_MOCK_MODE` is not `false`, the API returns success without sending email.
- If `CONTACT_MOCK_MODE=false`, valid SMTP credentials are required.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Database-related scripts (Prisma):

```bash
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:reset
```

## Important Notes

- Current `start` script is Windows-friendly.
- Current `build` script uses `cp`, which is Unix-style and may fail on Windows shells.

If you need Windows compatibility for `build`, update script to use cross-platform copy tooling (e.g. `cpx`, `shx`) or PowerShell commands.

## Branding & Credits

- Site content: Mohamed Mamdouh
- Footer credit link: [Abdelaziz Sleem](https://abdelaziz-sleem.vercel.app/)

## Deployment

Recommended: Vercel.

Before deploy:
- Set `NEXT_PUBLIC_SITE_URL` to your real domain.
- Set `CONTACT_MOCK_MODE=false` if you want real email sending.
- Add SMTP environment variables in hosting dashboard.

## License

Private project.
