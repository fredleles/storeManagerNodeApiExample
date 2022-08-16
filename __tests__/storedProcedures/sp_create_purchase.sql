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