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