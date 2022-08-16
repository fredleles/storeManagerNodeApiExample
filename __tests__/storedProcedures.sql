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