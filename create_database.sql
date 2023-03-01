CREATE DATABASE bank;

USE bank;

CREATE TABLE users(username varchar(20), password varchar(20), balance int, PRIMARY KEY (username));
CREATE TABLE transfers(id int AUTO_INCREMENT, origin varchar(20), destination varchar(20), amount int, PRIMARY KEY (id));
CREATE TABLE overdrafts(id int AUTO_INCREMENT, username varchar(20), amount int, managed boolean, approved boolean, PRIMARY KEY (id));

INSERT INTO users(username, password, balance) VALUES ('admin', 'admin', 0)