-- DROP TABLE `acitivity_log`

CREATE TABLE `activity_log` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `project_id` integer,
  `project_title` varchar(255),
  `action` ENUM ('created', 'updated') NOT NULL,
  `user_id` integer,
  `user_name` varchar(255),
  `time_stamp` timestamp DEFAULT (now())
);

ALTER TABLE `activity_log` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

ALTER TABLE `activity_log` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
