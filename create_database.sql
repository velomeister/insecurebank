CREATE DATABASE `bank`;

USE `bank`;

CREATE TABLE `bank`.`users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `balance` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE `bank`.`transfers`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `date` DATE DEFAULT (CURRENT_TIMESTAMP),
    `originEmail` VARCHAR(255) NOT NULL,
    `destinationEmail` VARCHAR(255) NOT NULL,
    `amount` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`originEmail`) REFERENCES `users`(`email`),
    FOREIGN KEY (`destinationEmail`) REFERENCES `users`(`email`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

CREATE TABLE `bank`.`overdrafts`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(255) NOT NULL,
    `amount` INT NOT NULL,
    `date` DATE DEFAULT (CURRENT_TIMESTAMP),
    `managed` BOOLEAN DEFAULT 0,
    `approved` BOOLEAN DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userEmail`) REFERENCES `users`(`email`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

INSERT INTO `users`(`fullName`, `email`, `password`, `role`, `balance`) VALUES ('Daniel Vela', 'dvela@insecurebank.com', 'dvela', 'Administrator', 0);
INSERT INTO `users`(`fullName`, `email`, `password`, `role`, `balance`) VALUES ('Sergio Valderrama', 'svalderrama@insecurebank.com', 'svalderrama', 'Auditor', 0);
INSERT INTO `users`(`fullName`, `email`, `password`, `role`, `balance`) VALUES ('Nicolás Nontoa', 'nnontoa@insecurebank.com', 'nnontoa', 'User', 1500);
INSERT INTO `users`(`fullName`, `email`, `password`, `role`, `balance`) VALUES ('Daniel Bermúdez', 'dbermudez@insecurebank.com', 'dbermudez', 'User', 1500);