DROP DATABASE IF EXISTS StoreManagerExample;

CREATE DATABASE StoreManagerExample;

USE StoreManagerExample;

CREATE TABLE products (
  id INT NOT NULL auto_increment,
  title VARCHAR(30) NOT NULL,
  sale_price DECIMAL(6, 2) NOT NULL,
  active_flag BIT NOT NULL DEFAULT 1,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales (
  id INT NOT NULL auto_increment,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  payment_type VARCHAR(30) NOT NULL,
  total DECIMAL(6, 2) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales_products (
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (sale_id)
    REFERENCES sales (id)
    ON DELETE CASCADE,
  FOREIGN KEY (product_id)
    REFERENCES products (id)
)  ENGINE=INNODB;

CREATE TABLE stock (
  id INT NOT NULL auto_increment,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  un_cost DECIMAL(6, 2) NOT NULL,
  FOREIGN KEY (product_id)
    REFERENCES products (id),    
  PRIMARY KEY(id)
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;