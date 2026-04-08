CREATE TABLE `admins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admins_username_unique` ON `admins` (`username`);--> statement-breakpoint
CREATE TABLE `content_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `materi` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`judul` text NOT NULL,
	`konten` text NOT NULL,
	`audio_url` text,
	`urutan` integer
);
--> statement-breakpoint
CREATE TABLE `riwayat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`soal_id` integer,
	`jawaban_user` text,
	`is_correct` integer,
	`waktu_jawab` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`soal_id`) REFERENCES `soal`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`iconName` text,
	`description` text,
	`explanation` text,
	`examples` text
);
--> statement-breakpoint
CREATE TABLE `soal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`materi_id` integer,
	`pertanyaan` text NOT NULL,
	`jawaban_benar` text NOT NULL,
	`opsi_a` text,
	`opsi_b` text,
	`opsi_c` text,
	`opsi_d` text,
	FOREIGN KEY (`materi_id`) REFERENCES `materi`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`role` text DEFAULT 'student',
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
