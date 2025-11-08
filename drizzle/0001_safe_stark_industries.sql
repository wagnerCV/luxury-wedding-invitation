CREATE TABLE `rsvps` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`guestsCount` int NOT NULL,
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `rsvps_id` PRIMARY KEY(`id`)
);
