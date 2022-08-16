const connection = require('./dbConfig');

const getSalesProductsBySaleId = (saleId) => (
  connection.execute(
    `SELECT product_id, quantity, (sale_price * quantity) AS subtotal
    FROM StoreManagerExample.sales_products
    INNER JOIN StoreManagerExample.products
    ON id = product_id
    WHERE sale_id = ?`, [saleId]
  )
);

const dbGetAll = () => (
  connection.execute(
    `SELECT id, date, payment_type, total
    FROM StoreManagerExample.sales`
  )
);

const dbGetById = (id) => (
  connection.execute(
    `SELECT id, date, payment_type, total
    FROM StoreManagerExample.sales
    WHERE id = ?`, [id]
  )
);

const dbCreateSale = (payment_type, total) => (
  connection.query(
    'CALL sp_create_sale(?,?)',
    [payment_type, total]
  )
);

const dbCreateSalesProduct = (saleId, product_id, quantity) => (
  connection.query(
    'CALL sp_create_sales_product(?,?,?)',
    [saleId, product_id, quantity]
  )
);

module.exports = {
  dbGetAll,
  dbCreateSale,
  dbCreateSalesProduct,
  dbGetById,
  getSalesProductsBySaleId,
}