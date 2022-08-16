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