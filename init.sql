CREATE DATABASE IF NOT EXISTS `olx-app`;
USE `olx-app`;
CREATE TABLE IF NOT EXISTS test(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    fileinput BLOB,
    price INT(6),
    email VARCHAR(40) NOT NULL
);