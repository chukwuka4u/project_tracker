CREATE TABLE `user` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `name` varchar(255),
  `password` varchar(255),
  `role` varchar(255),
  `created_at` timestamp 
);

CREATE TABLE `project` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `summary` varchar(255),
  `status` ENUM ('pending', 'ongoing', 'completed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp,
  `created_by` integer,
  `updated_by` integer
);

CREATE TABLE `acitivity_log` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `project_id` integer,
  `project_title` varchar(255),
  `action` ENUM ('created', 'updated') NOT NULL,
  `user_id` integer,
  `user_name` varchar(255),
  `time_stamp` timestamp DEFAULT (now())
);

ALTER TABLE `project` ADD FOREIGN KEY (`created_by`) REFERENCES `user` (`id`);

ALTER TABLE `project` ADD FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`);

ALTER TABLE `acitivity_log` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

ALTER TABLE `acitivity_log` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
