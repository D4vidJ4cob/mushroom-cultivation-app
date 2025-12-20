CREATE TABLE `batch_assignments` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int unsigned NOT NULL,
	`substrate_id` int unsigned NOT NULL,
	`role` enum('manager','worker') NOT NULL DEFAULT 'worker',
	CONSTRAINT `batch_assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grain_spawns` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`inoculation_date` date NOT NULL,
	`characteristic` varchar(255),
	`contamination_status` boolean,
	`shaken` boolean,
	`species_id` int unsigned NOT NULL,
	`mother_culture_id` int unsigned,
	`liquid_culture_id` int unsigned,
	CONSTRAINT `grain_spawns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `liquid_cultures` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`inoculation_date` date NOT NULL,
	`characteristic` varchar(255),
	`contamination_status` boolean,
	`species_id` int unsigned NOT NULL,
	CONSTRAINT `liquid_cultures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mother_cultures` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`inoculation_date` date NOT NULL,
	`characteristic` varchar(255),
	`species_id` int unsigned NOT NULL,
	CONSTRAINT `mother_cultures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `species` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `species_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_species_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `substrates` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`inoculation_date` date NOT NULL,
	`incubation_date` date,
	`contamination_status` boolean,
	`grain_spawn_id` int unsigned NOT NULL,
	CONSTRAINT `substrates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`roles` json NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `batch_assignments` ADD CONSTRAINT `batch_assignments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `batch_assignments` ADD CONSTRAINT `batch_assignments_substrate_id_substrates_id_fk` FOREIGN KEY (`substrate_id`) REFERENCES `substrates`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `grain_spawns` ADD CONSTRAINT `grain_spawns_species_id_species_id_fk` FOREIGN KEY (`species_id`) REFERENCES `species`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `grain_spawns` ADD CONSTRAINT `grain_spawns_mother_culture_id_mother_cultures_id_fk` FOREIGN KEY (`mother_culture_id`) REFERENCES `mother_cultures`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `grain_spawns` ADD CONSTRAINT `grain_spawns_liquid_culture_id_liquid_cultures_id_fk` FOREIGN KEY (`liquid_culture_id`) REFERENCES `liquid_cultures`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `liquid_cultures` ADD CONSTRAINT `liquid_cultures_species_id_species_id_fk` FOREIGN KEY (`species_id`) REFERENCES `species`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mother_cultures` ADD CONSTRAINT `mother_cultures_species_id_species_id_fk` FOREIGN KEY (`species_id`) REFERENCES `species`(`id`) ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `substrates` ADD CONSTRAINT `substrates_grain_spawn_id_grain_spawns_id_fk` FOREIGN KEY (`grain_spawn_id`) REFERENCES `grain_spawns`(`id`) ON DELETE restrict ON UPDATE no action;