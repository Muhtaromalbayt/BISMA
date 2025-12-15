# MATHSPEAK INDONESIA
Standar Pembacaan Simbol Matematika untuk Tunanetra (Bahasa Indonesia)

Dokumen ini mendefinisikan aturan standar untuk membaca simbol matematika dalam aplikasi BISMA, diadaptasi dari MathSpeak untuk Bahasa Indonesia.

## A. Pembacaan Pecahan
Format: `a/b`
Pembacaan: "a per b"

Contoh:
- `1/2` → "satu per dua"
- `3/4` → "tiga per empat"

## B. Kurung
Format: `(...)`
Pembacaan: "buka kurung ... tutup kurung"

Contoh:
- `(a + b)` → "buka kurung a tambah b tutup kurung"

## C. Operasi Dasar
| Simbol | Pembacaan |
|--------|-----------|
| `+`    | tambah    |
| `-`    | kurang    |
| `×` / `*` | kali   |
| `÷` / `/` | bagi   |
| `=`    | sama dengan |

## D. Pecahan Campuran
Format: `n a/b`
Pembacaan: "n dan a per b"

Contoh:
- `2 1/3` → "dua dan satu per tiga"
- `5 1/2` → "lima dan satu per dua"

## E. Perbandingan
| Simbol | Pembacaan |
|--------|-----------|
| `<`    | lebih kecil dari |
| `>`    | lebih besar dari |
| `≤`    | lebih kecil sama dengan |
| `≥`    | lebih besar sama dengan |

## F. Ekspresi Bersarang
Aturan: Baca urut dari kiri ke kanan, sebutkan kurung secara eksplisit untuk menghindari ambiguitas.

Contoh: `(a + b) / (c - d)`
Pembacaan: "buka kurung a tambah b tutup kurung per buka kurung c kurang d tutup kurung"

## H. Aturan Pecahan Lanjut (Chapter 7)

Aturan ini mengacu pada standar MathSpeak untuk menangani pecahan bersarang dengan indikator kedalaman.

### 1. Pecahan Sederhana (Simple Fractions)
Digunakan untuk pecahan yang tidak mengandung pecahan lain di dalamnya.
*   **Indikator Awal**: `Mulai Pecahan`
*   **Pemisah**: `Per`
*   **Indikator Akhir**: `Selesai Pecahan`

**Contoh:** `(a+b)/(c-d)`
*   **Bacaan**: "Mulai Pecahan, a tambah b, Per, c kurang d, Selesai Pecahan"

### 2. Pecahan Bersarang Satu Tingkat (Nested Once)
Digunakan jika pembilang atau penyebut mengandung pecahan sederhana.
*   **Indikator Awal**: `Mulai Mulai Pecahan`
*   **Pemisah**: `Per Per`
*   **Indikator Akhir**: `Selesai Selesai Pecahan`

**Contoh:** `(x/y) / z`
*   **Bacaan**: "Mulai Mulai Pecahan, Mulai Pecahan, x, Per, y, Selesai Pecahan, Per Per, z, Selesai Selesai Pecahan"

### 3. Pecahan Bersarang Dua Tingkat (Nested Twice)
Digunakan jika pecahan bersarang mengandung pecahan lagi.
*   **Indikator Awal**: `Mulai Mulai Mulai Pecahan`
*   **Pemisah**: `Per Per Per`
*   **Indikator Akhir**: `Selesai Selesai Selesai Pecahan`

### 4. Intonasi dan Jeda
*   Gunakan jeda (koma) setelah setiap indikator awal dan sebelum/sesudah pemisah untuk kejelasan.
*   Contoh: "Mulai Pecahan, [jeda], 1, [jeda], Per, [jeda], 2, [jeda], Selesai Pecahan"

