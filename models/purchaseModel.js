const connection = require('./dbConfig');

const dbGetAll = () => (
  connection.execute(
    `SELECT id, date, product_id, quantity, un_cost
    FROM StoreManagerExample.purchases
    ORDER BY date`
  )
);

const dbGetById = (id) => (
  connection.execute(
    `SELECT id, date, product_id, quantity, un_cost
    FROM StoreManagerExample.purchases
    WHERE id=?`, [id]
  )
);

const dbCreate = (product_id, quantity, un_cost) => (
  connection.query(
    'CALL sp_create_purchase(?,?,?)',
    [product_id, quantity, un_cost]
  )
);

const dbUpdate = (id, product_id, quantity, un_cost) => (
  connection.query(
    'CALL sp_update_purchase(?,?,?,?)',
    [id, product_id, quantity, un_cost]
  )
);

module.exports = {
  dbGetAll,
  dbCreate,
  dbUpdate,
  dbGetById,
}