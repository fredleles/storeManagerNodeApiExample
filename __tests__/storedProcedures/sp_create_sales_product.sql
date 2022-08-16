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