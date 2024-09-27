CREATE TABLE `user` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`gender` TINYINT(1) NOT NULL,
	`age` INT(11) NULL DEFAULT NULL,
	`username` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`salt` VARCHAR(64) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`resetToken` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`resetTokenExpiration` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `email` (`email`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=29
;
