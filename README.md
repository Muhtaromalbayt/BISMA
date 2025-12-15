# BISMA — Bahasa Instruksi Simbol Matematika Audio

Prototype Skripsi – Pembelajaran Pecahan Ramah Tunanetra
MathSpeak Indonesia + Fullstack Cloudflare

## Deskripsi Proyek
BISMA adalah aplikasi web edukasi yang dirancang khusus untuk membantu siswa tunanetra belajar matematika, khususnya materi pecahan. Aplikasi ini menggunakan standar **MathSpeak Indonesia** untuk membacakan simbol matematika secara audio-first dan mendukung navigasi keyboard penuh serta aksesibilitas ARIA.

## Fitur Utama
- **Audio-First**: Semua materi dan soal dibacakan otomatis.
- **MathSpeak Indonesia**: Standar pembacaan simbol matematika yang konsisten.
- **Sonifikasi**: Representasi nilai pecahan melalui pitch audio.
- **Aksesibilitas**: Full keyboard navigation & screen reader support.

## Struktur Repository
```
bisma/
├── frontend/       # React + Vite + TailwindCSS
├── backend/        # Cloudflare Workers + Hono
├── db/             # Cloudflare D1 Schema & Seeds
├── MATHSPEAK.md    # Dokumentasi Aturan MathSpeak
└── ...
```

## Instalasi Lokal

### Prasyarat
- Node.js (v18+)
- npm / yarn / pnpm
- Wrangler CLI (untuk Cloudflare)

### 1. Clone Repository
```bash
git clone <repository-url>
cd bisma
```

### 2. Setup Backend
```bash
cd backend
npm install
# Setup .env
cp .env.example .env
# Jalankan development server
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## Deployment

### Cloudflare Workers (Backend)
```bash
cd backend
npx wrangler d1 create bisma-db
npx wrangler d1 execute bisma-db --file=../db/schema.sql
npm run deploy
```

### Cloudflare Pages (Frontend)
```bash
cd frontend
npm run build
npx wrangler pages deploy dist --project-name=bisma-frontend
```

## Konfigurasi .env
Salin `.env.example` ke `.env` di folder `backend`:
```
DATABASE_ID=<ID_DATABASE_D1_ANDA>
API_URL=<URL_BACKEND_WORKER_ANDA>
```

## Lisensi
MIT License
