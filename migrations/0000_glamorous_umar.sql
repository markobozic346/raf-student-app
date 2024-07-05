CREATE TABLE IF NOT EXISTS "subject_task" (
	"id" integer PRIMARY KEY NOT NULL,
	"subject" varchar(100) NOT NULL,
	"user_id" integer NOT NULL,
	"task" varchar(1000) NOT NULL,
	"deadline" timestamp with time zone NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
