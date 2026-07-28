# Bobby Derin — Portfolio

A portfolio site for Bobby Derin (photography, videography, graphic design), built with:

- **React + Vite** (frontend)
- **Tailwind CSS v4** (styling)
- **Supabase** — Postgres database for work items + contact messages, and Storage for photos/video thumbnails
- **Vercel** — hosting for the frontend, and a serverless function (`api/contact.js`) for the contact form

## Design

Dark, editorial layout in the spirit of the Ander Dark reference: big display name up top, a scrolling
"Photography — Videography — Graphic Design" marquee, a filterable work grid, about, services and contact.
The signature detail is the EXIF-style caption (camera, lens, category, year) that slides up under each
work item on hover — a nod to Bobby's photography background.

## 1. Run it locally

```bash
npm install
cp .env.example .env    # fill in your Supabase values (see step 2)
npm run dev
```

The contact form calls `/api/contact`. To test that locally too, install the Vercel CLI and run
`vercel dev` instead of `npm run dev` — it serves both the Vite frontend and the `/api` functions together.

## 2. Set up Supabase

1. Create a free project at supabase.com.
2. Open **SQL Editor** and run everything in `supabase/schema.sql`. This creates:
   - `work_items` — every photo/video/design piece shown in the grid (title, medium, category, year,
     camera/EXIF caption, and `image_path` pointing at a file in storage)
   - `contact_messages` — submissions from the contact form
   - a public storage bucket called `portfolio-media`
   - Row Level Security policies so the public can only *read* published work items and storage files,
     and only the server (service role key) can insert contact messages
3. Go to **Storage → portfolio-media** and upload Bobby's photos/thumbnails/mockups into it.
4. Go to **Table editor → work_items** and add a row per piece of work, e.g.:
   | title | medium | category | year | camera | image_path |
   |---|---|---|---|---|---|
   | Harbour Line, Chennai | photography | Editorial | 2025 | Sony A7IV · 35mm · f/2.8 · 1/250s · ISO 400 | harbour-line.jpg |

   `medium` must be one of `photography`, `videography`, `design`. `image_path` is the filename/path
   as uploaded to the `portfolio-media` bucket.
5. Go to **Project Settings → API** and copy:
   - `Project URL` → used as both `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`
   - `service_role` key (keep this secret!) → `SUPABASE_SERVICE_ROLE_KEY`

Until you add real rows, the site shows sample placeholder work automatically, so it never looks empty.

## 3. Deploy to Vercel

1. Push this project to a GitHub repo.
2. Import it in Vercel (New Project → select the repo). Vercel will detect the Vite framework
   automatically via `vercel.json`.
3. In **Project Settings → Environment Variables**, add all four variables from `.env.example`
   with your real Supabase values (do this for Production, Preview, and Development).
4. Deploy. The React site is served as a static build; `api/contact.js` is deployed automatically
   as a Vercel serverless function.

## Project structure

```
src/
  components/       UI sections (Header, Hero, Marquee, WorkGrid, About, Services, Contact, Footer)
  lib/
    supabaseClient.js   Supabase client (browser-safe, anon key only)
    useWork.js          Fetches work_items from Supabase, with sample fallback data
api/
  contact.js        Vercel serverless function — validates and saves contact form submissions
supabase/
  schema.sql         Full DB schema, RLS policies, and storage bucket setup
```

## Customizing content

- **Work grid**: add/edit rows in `work_items` (via Supabase Table editor) and upload files to the
  `portfolio-media` bucket. No code changes needed.
- **About / services / bio copy**: edit `src/components/About.jsx` and `src/components/Services.jsx` directly.
- **Colors/fonts**: design tokens live at the top of `src/index.css` under `@theme`.
- **Contact form storage**: submissions land in the `contact_messages` table — view them in the
  Supabase dashboard, or later wire up an email notification (e.g. via Resend) inside `api/contact.js`.
