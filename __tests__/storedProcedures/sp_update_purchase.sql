/* Update purchase */
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