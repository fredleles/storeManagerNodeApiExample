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