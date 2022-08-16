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