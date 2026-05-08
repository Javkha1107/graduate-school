# АШУҮИС Эрдмийн Сургуулийн Вэб Сайт

Анагаахын Шинжлэх Ухааны Үндэсний Их Сургуулийн Эрдмийн сургуулийн хоёр хэлтэй (Монгол/Англи) вэб сайт.

**Технологи:** Next.js 16 · React 19 · Tailwind CSS v4 · Supabase · Framer Motion · Lucide Icons

---

## Эхлүүлэх

```bash
cp .env.local.example .env.local
# Supabase болон админ нууц үгийн утгуудыг бөглөнө
npm install
npm run dev
```

### Орчны хувьсагчууд (Environment Variables)

```
NEXT_PUBLIC_SUPABASE_URL=       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anon/public түлхүүр
SUPABASE_SERVICE_ROLE_KEY=      # Supabase service role түлхүүр (нууц!)
ADMIN_PASSWORD=                 # Админ хуудасны нэвтрэх нууц үг
```

---

## Бүтэц

```
web/
├── src/
│   ├── app/
│   │   ├── [locale]/        # Нийтийн хуудсууд (mn/en хэлний чиглүүлэлт)
│   │   ├── admin/           # Админ хуудас (хамгаалалттай)
│   │   │   ├── news/        # Мэдээ удирдах
│   │   │   ├── faculty/     # Багш нар удирдах
│   │   │   ├── collaborations/ # Гадаад харилцаа удирдах
│   │   │   ├── content/     # Бусад контент (эрдмийн чуулган, бааз эмнэлгүүд)
│   │   │   ├── manual/      # Гарын авлага (системд суулгасан)
│   │   │   └── login/       # Нэвтрэх хуудас
│   │   └── api/admin/       # Серверийн API (JWT баталгаажуулалт)
│   │       ├── news/        # Мэдээний API
│   │       ├── faculty/     # Багш нарын API
│   │       ├── collaborations/ # Гадаад харилцааны API
│   │       ├── site-content/   # Контент API
│   │       ├── upload/      # Файл upload (зураг, PDF)
│   │       ├── login/       # Нэвтрэх
│   │       └── logout/      # Гарах
│   ├── components/
│   │   ├── admin/           # Админ UI компонентууд (маягт, толгой)
│   │   ├── navigation/      # Толгой, хөл, хажуу цэс
│   │   ├── news/            # Мэдээ харуулах компонентууд
│   │   ├── sections/        # Хуудасны хэсгүүд (hero, sidebar гэх мэт)
│   │   └── ui/              # Дундын UI элементүүд (button, input, select гэх мэт)
│   ├── data/                # Статик контент (mn.json, en.json, leadership гэх мэт)
│   └── lib/                 # Туслах функцууд (supabase client, faculty helpers гэх мэт)
├── public/                  # Статик файлууд (зураг, лого)
├── docs/                    # Баримт бичиг (VM шаардлага, файл серверийн санал)
├── scripts/                 # Туслах скриптүүд (check-file-links)
└── reports/                 # Үүсгэсэн тайлангууд
```

---

## Үндсэн боломжууд

### Нийтийн сайт (`/[locale]/*`)

- Хоёр хэлтэй контент (Монгол / Англи)
- Route-д суурилсан хэлний чиглүүлэлт (`mn.json` / `en.json` толь бичиг)
- Хуудсууд: Нүүр, Танилцуулга, Сургалт, Судалгаа, Элсэлт, Хамтын ажиллагаа, Мэдээ, Холбоо барих, Журам, Сургалтын төвүүд
- SEO: sitemap.ts, robots.ts

### Админ хуудас (`/admin/*`)

- Нууц үгээр нэвтрэх (JWT cookie баталгаажуулалт)
- **Мэдээ удирдах:** Нэмэх, засах, устгах. Rich text editor (Quill), зураг/PDF upload, ангилал, идэвхтэй/идэвхгүй төлөв
- **Багш нар удирдах:** Нэмэх, засах, устгах. Зураг upload, боловсрол/туршлага/судалгааны мэдээлэл
- **Гадаад харилцаа:** Олон улсын хамтын ажиллагаа. Зураг upload, идэвхтэй/идэвхгүй төлөв
- **Бусад контент:** Эрдмийн чуулган (текст + PDF архивын холбоосууд), Бааз эмнэлгүүдийн жагсаалт
- **Гарын авлага:** Админ хуудас, Supabase, Vercel deploy, аюулгүй байдлын заавар

### API (`/api/admin/*`)

- JWT session баталгаажуулалт
- Supabase Storage руу файл upload (зураг, PDF)
- Бүх контентын CRUD үйлдлүүд
- ISR revalidation endpoint

---

## Скриптүүд

```bash
npm run dev          # Хөгжүүлэлтийн сервер эхлүүлэх
npm run build        # Production build хийх
npm run start        # Production сервер эхлүүлэх
npm run lint         # ESLint ажиллуулах
```

---

## Supabase тохиргоо

1. Supabase project үүсгэнэ
2. SQL editor дээр seed файлуудыг ажиллуулна:
   - `seed-news.sql`
   - `seed-faculty.sql`
   - `seed-collaborations.sql`
   - `seed-site-content.sql`
3. `images` нэртэй storage bucket үүсгэнэ (public)
4. Project URL, anon key, service role key-г `.env.local` файлд хуулна

---

## Deploy (байршуулах)

Сайт **Vercel** дээр байрладаг. `main` branch руу push хийхэд автоматаар deploy хийгдэнэ.

1. `main` руу push → Vercel автоматаар build + deploy хийнэ
2. Environment variables-ийг Vercel dashboard дээр тохируулсан байх шаардлагатай
3. Custom domain-г Vercel Settings → Domains хэсэгт тохируулна

---

## Баримт бичиг

- `/admin/manual` — Админ хуудасны гарын авлага (админ хуудаснаас хандана)
