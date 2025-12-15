# Panduan Deploy BISMA ke Online

## Opsi 1: Cloudflare Pages (RECOMMENDED - Gratis & Mudah)

### Langkah 1: Persiapan
1. Buat akun di [Cloudflare](https://dash.cloudflare.com/sign-up) (gratis)
2. Pastikan project sudah di-push ke GitHub/GitLab

### Langkah 2: Build Frontend
```bash
cd frontend
npm run build
```

### Langkah 3: Deploy ke Cloudflare Pages

#### Opsi A: Via Dashboard (Paling Mudah)
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih **Pages** di sidebar
3. Klik **Create a project**
4. Pilih **Connect to Git** atau **Direct Upload**

**Jika Connect to Git:**
- Pilih repository BISMA Anda
- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `frontend`

**Jika Direct Upload:**
- Upload folder `frontend/dist` yang sudah di-build

5. Klik **Save and Deploy**
6. Tunggu beberapa menit, website akan online di `https://bisma-xxx.pages.dev`

#### Opsi B: Via Wrangler CLI
```bash
# Install Wrangler
npm install -g wrangler

# Login ke Cloudflare
wrangler login

# Deploy dari folder frontend
cd frontend
npm run build
wrangler pages deploy dist --project-name=bisma
```

### Langkah 4: Custom Domain (Opsional)
1. Di Cloudflare Pages dashboard, pilih project BISMA
2. Klik **Custom domains**
3. Tambahkan domain Anda (misal: bisma.com)
4. Ikuti instruksi untuk update DNS

---

## Opsi 2: Vercel (Gratis & Cepat)

### Langkah 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Langkah 2: Deploy
```bash
cd frontend
vercel
```

### Langkah 3: Ikuti Prompt
- Login dengan GitHub/GitLab/Email
- Pilih scope (personal/team)
- Link ke existing project atau buat baru
- Konfirmasi settings:
  - Framework: Vite
  - Build command: `npm run build`
  - Output directory: `dist`

Website akan online di `https://bisma-xxx.vercel.app`

---

## Opsi 3: Netlify (Gratis)

### Langkah 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Langkah 2: Build & Deploy
```bash
cd frontend
npm run build
netlify deploy --prod
```

### Langkah 3: Ikuti Prompt
- Login dengan GitHub/GitLab/Email
- Create new site atau link existing
- Publish directory: `dist`

Website akan online di `https://bisma-xxx.netlify.app`

---

## Opsi 4: GitHub Pages (Gratis)

### Langkah 1: Update vite.config.ts
```typescript
export default defineConfig({
  base: '/bisma/', // Ganti dengan nama repo Anda
  // ... config lainnya
})
```

### Langkah 2: Build
```bash
cd frontend
npm run build
```

### Langkah 3: Deploy Script
Tambahkan script di `frontend/package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### Langkah 4: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Langkah 5: Deploy
```bash
npm run deploy
```

Website akan online di `https://username.github.io/bisma/`

---

## Rekomendasi untuk BISMA

**Gunakan Cloudflare Pages** karena:
- ✅ Gratis unlimited
- ✅ CDN global (cepat di seluruh dunia)
- ✅ SSL otomatis
- ✅ Mudah setup custom domain
- ✅ Integrasi dengan Cloudflare Workers (jika butuh backend)
- ✅ Analytics gratis

---

## Troubleshooting

### Error: "Failed to build"
- Pastikan semua dependencies terinstall: `npm install`
- Cek tidak ada error di console: `npm run build`

### Error: "404 Not Found" setelah deploy
- Tambahkan file `_redirects` di folder `public`:
  ```
  /*    /index.html   200
  ```

### Custom Domain tidak connect
- Pastikan DNS sudah diupdate (bisa butuh 24 jam)
- Cek di Cloudflare DNS settings

---

## Langkah Selanjutnya Setelah Online

1. **Setup Analytics** - Monitor pengunjung
2. **Custom Domain** - Gunakan domain sendiri (misal: bisma.id)
3. **SEO Optimization** - Tambahkan meta tags
4. **Performance** - Optimize images dan code splitting
5. **Backend** - Deploy Cloudflare Workers jika butuh API

---

## Butuh Bantuan?

Jika ada error saat deploy, screenshot error dan saya akan bantu troubleshoot! 🚀
