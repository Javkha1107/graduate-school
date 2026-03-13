# MNUMS Graduate School Website

Bilingual (Mongolian/English) website for the MNUMS Graduate School, built with Next.js 16, Tailwind CSS v4, and Supabase.

## Setup

```bash
cp .env.local.example .env.local
# Fill in your Supabase credentials and admin password
npm install
npm run dev
```

## Supabase Setup

1. Create a Supabase project
2. Run `supabase-schema.sql` in the SQL editor
3. Create a storage bucket called `images` (public)
4. Copy the project URL, anon key, and service role key to `.env.local`

## Architecture

- `/[locale]/*` — Public pages with route-based i18n (mn/en)
- `/admin/*` — Admin panel (news CRUD with rich text editor)
- `/api/admin/*` — Server-side API routes with JWT auth
- Static content from `src/data/mn.json` and `src/data/en.json`
- News from Supabase with fallback to `src/data/news.json`
