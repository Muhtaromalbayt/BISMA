import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull(),
    role: text('role').default('student'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const admins = sqliteTable('admins', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    password: text('password').notNull(),
});

export const materi = sqliteTable('materi', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    judul: text('judul').notNull(),
    konten: text('konten').notNull(),
    audioUrl: text('audio_url'),
    urutan: integer('urutan'),
});

export const soal = sqliteTable('soal', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    materiId: integer('materi_id').references(() => materi.id),
    pertanyaan: text('pertanyaan').notNull(),
    jawabanBenar: text('jawaban_benar').notNull(),
    opsiA: text('opsi_a'),
    opsiB: text('opsi_b'),
    opsiC: text('opsi_c'),
    opsiD: text('opsi_d'),
});

export const riwayat = sqliteTable('riwayat', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').references(() => users.id),
    soalId: integer('soal_id').references(() => soal.id),
    jawabanUser: text('jawaban_user'),
    isCorrect: integer('is_correct', { mode: 'boolean' }),
    waktuJawab: text('waktu_jawab').default(sql`CURRENT_TIMESTAMP`),
});

// Update rules to match index.ts expectations
export const rules = sqliteTable('rules', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    iconName: text('iconName'),
    description: text('description'),
    explanation: text('explanation'),
    examples: text('examples'), // Stored as JSON string
});

export const contentSettings = sqliteTable('content_settings', {
    id: text('id').primaryKey(), // e.g. 'default'
    data: text('data').notNull(), // JSON string
});
