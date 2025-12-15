-- Schema
DROP TABLE IF EXISTS riwayat;
DROP TABLE IF EXISTS soal;
DROP TABLE IF EXISTS materi;
DROP TABLE IF EXISTS rules;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    judul TEXT NOT NULL,
    konten TEXT NOT NULL,
    audio_url TEXT,
    urutan INTEGER
);

CREATE TABLE soal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    materi_id INTEGER,
    pertanyaan TEXT NOT NULL,
    jawaban_benar TEXT NOT NULL,
    opsi_a TEXT,
    opsi_b TEXT,
    opsi_c TEXT,
    opsi_d TEXT,
    FOREIGN KEY (materi_id) REFERENCES materi(id)
);

CREATE TABLE riwayat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    soal_id INTEGER,
    jawaban_user TEXT,
    is_correct BOOLEAN,
    waktu_jawab DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (soal_id) REFERENCES soal(id)
);

CREATE TABLE rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kategori TEXT NOT NULL,
    simbol TEXT NOT NULL,
    bacaan TEXT NOT NULL,
    contoh TEXT
);

-- Seed Data
INSERT INTO materi (judul, konten, urutan) VALUES 
('Pengenalan Pecahan', 'Pecahan adalah bagian dari keseluruhan. Contoh: 1/2 artinya satu bagian dari dua bagian yang sama.', 1),
('Penjumlahan Pecahan', 'Untuk menjumlahkan pecahan dengan penyebut sama, jumlahkan pembilangnya saja.', 2),
('Pecahan Campuran', 'Pecahan campuran terdiri dari bilangan bulat dan pecahan biasa. Contoh: 2 1/3.', 3);

INSERT INTO soal (materi_id, pertanyaan, jawaban_benar, opsi_a, opsi_b, opsi_c, opsi_d) VALUES
(1, 'Berapakah nilai dari 1/2?', '0.5', '0.25', '0.5', '0.75', '1'),
(1, 'Manakah yang merupakan pecahan setengah?', '1/2', '1/3', '1/4', '1/2', '2/3'),
(2, 'Hasil dari 1/4 + 2/4 adalah...', '3/4', '2/4', '3/4', '3/8', '1/2'),
(2, 'Hasil dari 2/5 + 1/5 adalah...', '3/5', '3/10', '3/5', '1/5', '4/5'),
(3, 'Ubah 3/2 menjadi pecahan campuran.', '1 1/2', '1 1/2', '2 1/2', '1 1/4', '1 1/3');

INSERT INTO rules (kategori, simbol, bacaan, contoh) VALUES
('Pecahan', '/', 'per', '1/2 dibaca satu per dua'),
('Operasi', '+', 'tambah', '1 + 1 dibaca satu tambah satu'),
('Operasi', '-', 'kurang', '2 - 1 dibaca dua kurang satu'),
('Operasi', '×', 'kali', '2 × 3 dibaca dua kali tiga'),
('Operasi', '=', 'sama dengan', '1 + 1 = 2 dibaca satu tambah satu sama dengan dua'),
('Kurung', '()', 'buka kurung ... tutup kurung', '(a+b) dibaca buka kurung a tambah b tutup kurung');
