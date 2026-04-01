# RESUME PROYEK: BISMA

**BISMA** (Bahasa Instruksi Simbol Matematika Audio) adalah platform edukasi inovatif yang dirancang khusus untuk pembelajar tunanetra, dengan fokus pada standarisasi cara pembacaan simbol matematika (khususnya materi pecahan).

---

## 🚀 Ringkasan Proyek
- **Nama Proyek**: BISMA
- **Tagline**: Platform Pembelajaran Matematika Ramah Tunanetra
- **Konteks**: Prototype Skripsi Pendidikan Matematika FPMIPA Universitas Pendidikan Indonesia (UPI) 2025.
- **Tujuan**: Menghilangkan ambiguitas instruksi verbal dalam matematika melalui standarisasi audio-first.

## 🛠️ Tech Stack (Full-Stack Cloudflare)

### Frontend
- **Framework**: React.js + Vite
- **Styling**: TailwindCSS (dengan desain Glassmorphism & Obsidian Dark Theme)
- **Icons**: Lucide React
- **Routing**: React Router DOM

### Backend & Database
- **Serverless**: Cloudflare Workers + Hono
- **Database**: Cloudflare D1 (SQL-based edge database)
- **Storage/Static**: Cloudflare Pages

## ✨ Fitur Unggulan

1.  **Audio-First Experience**: Seluruh antarmuka dirancang untuk berinteraksi melalui audio, memberikan kemandirian penuh bagi siswa tunanetra.
2.  **Standarisasi MathSpeak Indonesia**: Implementasi pertama standar internasional MathSpeak yang diadaptasi ke Bahasa Indonesia untuk pembacaan simbol matematika yang presisi (Contoh: "Mulai Pecahan 1 Per 2 Selesai Pecahan").
3.  **Sonifikasi Pecahan**: Representasi nilai pecahan melalui nada (pitch audio) untuk memberikan intuisi besaran nilai secara non-verbal.
4.  **Aksesibilitas Tinggi**: Navigasi keyboard penuh, dukungan screen reader optimal (ARIA labels), dan kepatuhan standar WCAG.
5.  **Modul Pembelajaran**:
    - **Belajar**: Materi interaktif.
    - **Latihan**: Pengujian pemahaman dengan sistem feedback audio.
    - **Rules**: Dokumentasi standar pembacaan MathSpeak.
6.  **Admin Dashboard**: Panel manajemen konten untuk pengembang/guru dalam mengelola database materi.

## 📁 Struktur Repositori
```text
bisma/
├── frontend/       # Aplikasi web (React + TypeScript)
├── backend/        # API Serverless (Hono + Workers)
├── db/             # Skema & Seed Data SQL untuk Cloudflare D1
├── MATHSPEAK.md    # Dokumentasi standar teknis pembacaan
└── resume.md       # Ringkasan proyek (File ini)
```

## 📜 Lisensi
MIT License - Open for educational refinement.

---
*Dibuat untuk mendukung pendidikan inklusif di Indonesia.*
