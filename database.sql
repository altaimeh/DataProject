DROP SCHEMA IF EXISTS `tasksDB`;
CREATE SCHEMA IF NOT EXISTS `tasksDB` DEFAULT CHARACTER SET utf8;
USE `tasksDB`;
DROP TABLE IF EXISTS `tasksTable`;
CREATE TABLE `tasksTable` (
  `taskDescription` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `taskDate` varchar(10) NOT NULL,
  `taskLevel` varchar(4) NOT NULL
);
