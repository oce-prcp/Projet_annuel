CREATE DATABASE IF NOT EXISTS Annuel;
USE Annuel;

DROP TABLE IF EXISTS `Invoices`;
DROP TABLE IF EXISTS `Societies`;
DROP TABLE IF EXISTS `Subscriptions`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Files`;

CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(50),
  user_first_name VARCHAR(50),
  user_phone_number INT,
  user_email VARCHAR(100),
  user_password VARCHAR(100),
  user_storage_space_use DECIMAL(10,2) NOT NULL,
  user_role ENUM('admin','customer')
)

CREATE TABLE Subscriptions (
  subscription_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  subscription_storage_space DECIMAL(10,2),
  subscription_price DECIMAL(10,2),
  subscription_date date,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
)


CREATE TABLE Files (
  file_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  file_name VARCHAR(200),
  file_size DECIMAL(10,2),
  file_date DATE,
  file_format VARCHAR(10),
  file_content BLOB,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
)


CREATE TABLE Invoices (
  invoice_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subscription_id INT,
  invoice_quantity INT,
  invoice_number VARCHAR(255),
  invoice_amount_excluding_tax DECIMAL(10,2),
  invoice_vat DECIMAL(10,2),
  invoice_total_tax_amount DECIMAL(10,2),
  invoice_amount_including_tax DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (subscription_id) REFERENCES Subscriptions(subscription_id)
)

CREATE TABLE Societies (
  society_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  society_name varchar(100),
  society_location varchar(200),
  society_siret INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
)
