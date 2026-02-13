DO $$ BEGIN
  CREATE TYPE "public"."role" AS ENUM('manager', 'worker');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint
CREATE TABLE "batch_assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"substrate_id" integer NOT NULL,
	"role" "role" DEFAULT 'worker' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grain_spawns" (
	"id" serial PRIMARY KEY NOT NULL,
	"inoculation_date" date NOT NULL,
	"characteristic" varchar(255),
	"contamination_status" boolean,
	"shaken" boolean,
	"species_id" integer NOT NULL,
	"mother_culture_id" integer,
	"liquid_culture_id" integer
);
--> statement-breakpoint
CREATE TABLE "liquid_cultures" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"inoculation_date" date NOT NULL,
	"characteristic" varchar(255),
	"contamination_status" boolean,
	"species_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mother_cultures" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"inoculation_date" date NOT NULL,
	"characteristic" varchar(255),
	"species_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "species" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "substrates" (
	"id" serial PRIMARY KEY NOT NULL,
	"inoculation_date" date NOT NULL,
	"incubation_date" date,
	"contamination_status" boolean,
	"grain_spawn_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"roles" json NOT NULL
);
--> statement-breakpoint
ALTER TABLE "batch_assignments" ADD CONSTRAINT "batch_assignments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch_assignments" ADD CONSTRAINT "batch_assignments_substrate_id_substrates_id_fk" FOREIGN KEY ("substrate_id") REFERENCES "public"."substrates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grain_spawns" ADD CONSTRAINT "grain_spawns_species_id_species_id_fk" FOREIGN KEY ("species_id") REFERENCES "public"."species"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grain_spawns" ADD CONSTRAINT "grain_spawns_mother_culture_id_mother_cultures_id_fk" FOREIGN KEY ("mother_culture_id") REFERENCES "public"."mother_cultures"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grain_spawns" ADD CONSTRAINT "grain_spawns_liquid_culture_id_liquid_cultures_id_fk" FOREIGN KEY ("liquid_culture_id") REFERENCES "public"."liquid_cultures"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "liquid_cultures" ADD CONSTRAINT "liquid_cultures_species_id_species_id_fk" FOREIGN KEY ("species_id") REFERENCES "public"."species"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mother_cultures" ADD CONSTRAINT "mother_cultures_species_id_species_id_fk" FOREIGN KEY ("species_id") REFERENCES "public"."species"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "substrates" ADD CONSTRAINT "substrates_grain_spawn_id_grain_spawns_id_fk" FOREIGN KEY ("grain_spawn_id") REFERENCES "public"."grain_spawns"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_species_name_unique" ON "species" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_email_unique" ON "users" USING btree ("email");