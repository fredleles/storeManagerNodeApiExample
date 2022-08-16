const connection = require('./dbConfig');

const dbGetAll = () => (
  connection.execute(
    `SELECT id, title, sale_price
    FROM StoreManagerExample.products
    WHERE active_flag=1
    ORDER BY title`
  )
);

const dbGetById = (id) => (
  connection.execute(
    `SELECT id, title, sale_price, active_flag
    FROM StoreManagerExample.products
    WHERE id=?`, [id]
  )
);

const dbQueryByTitle = (title) => (
  connection.query(
    'CALL sp_filter_product_by_id(?)',
    [title]
  )
);

const dbCreate = (title, sale_price, active_flag) => (
  connection.query(
    'CALL sp_create_product(?,?,?)',
    [title, sale_price, active_flag]
  )
);

const dbUpdate = (id, title, sale_price, active_flag) => (
  connection.query(
    'CALL sp_update_product(?,?,?,?)',
    [id, title, sale_price, active_flag]
  )
);

module.exports = {
  dbGetAll,
  dbGetById,
  dbQueryByTitle,
  dbCreate,
  dbUpdate,
}