/* Filter products */
DROP PROCEDURE IF EXISTS StoreManagerExample.sp_filter_product_by_id;

CREATE PROCEDURE StoreManagerExample.sp_filter_product_by_id
(
  query VARCHAR(30)
)
BEGIN
  SET query = CONCAT('%', query, '%');
  
  SELECT id, title, sale_price
  FROM StoreManagerExample.products
  WHERE title LIKE query
  AND active_flag = 1;
END;

/* Create product */
DROP PROCEDURE IF EXISTS StoreManagerExample.sp_create_product;

CREATE PROCEDURE StoreManagerExample.sp_create_product
(
  _title VARCHAR(30),
  _sale_price DECIMAL(6, 2),
  _active_flag TINYINT
)
BEGIN  
  INSERT INTO StoreManagerExample.products
  (title, sale_price, active_flag)
  VALUES
  (_title, _sale_price, _active_flag);
  SELECT LAST_INSERT_ID() AS id;
END;

/* Update product */
DROP PROCEDURE IF EXISTS StoreManagerExample.sp_update_product;

CREATE PROCEDURE StoreManagerExample.sp_update_product
(
  _id INT,
  _title VARCHAR(30),
  _sale_price DECIMAL(6, 2),
  _active_flag TINYINT
)
BEGIN  
  UPDATE StoreManagerExample.products
  SET title = _title, sale_price = _sale_price, active_flag = _active_flag
  WHERE id = _id;
END;

/* Create purchase */
DROP PROCEDURE IF EXISTS StoreManagerExample.sp_create_purchase;

CREATE PROCEDURE StoreManagerExample.sp_create_purchase
(
  _product_id INT,
  _quantity INT,
  _un_cost DECIMAL(6, 2)
)
BEGIN  
  INSERT INTO StoreManagerExample.purchases
  (product_id, quantity, un_cost)
  VALUES
  (_product_id, _quantity, _un_cost);
  SELECT LAST_INSERT_ID() AS id;
END;

/* Update product */
DROP PROCEDURE IF EXISTS StoreManagerExample.sp_update_purchase;

CREATE PROCEDURE StoreManagerExample.sp_update_purchase
(
  _id INT,
  _product_id INT,
  _quantity INT,
  _un_cost DECIMAL(6, 2)
)
BEGIN  
  UPDATE StoreManagerExample.purchases
  SET product_id = _product_id, quantity = _quantity, un_cost = _un_cost
  WHERE id = _id;
END;

/* Create sale */
DROP PROCEDURE IF EXISTS StoreManagerExample.sp_create_sale;

CREATE PROCEDURE StoreManagerExample.sp_create_sale
(
  _payment_type VARCHAR(30),
  _total DECIMAL(6, 2)
)
BEGIN  
  INSERT INTO StoreManagerExample.sales
  (payment_type, total)
  VALUES
  (_payment_type, _total);
  SELECT LAST_INSERT_ID() AS saleId;
END;

/* Create product sale */
DROP PROCEDURE IF EXISTS StoreManagerExample.sp_create_sales_product;

CREATE PROCEDURE StoreManagerExample.sp_create_sales_product
(
  _sale_id INT,
  _product_id INT,
  _quantity INT
)
BEGIN  
  INSERT INTO StoreManagerExample.sales_products
  (sale_id, product_id, quantity)
  VALUES
  (_sale_id, _product_id, _quantity);
END;
