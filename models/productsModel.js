const connection = require('./dbConfig');

const dbGetAll = () => (
  connection.execute(
    `SELECT id, title, sale_price
    FROM StoreManagerExample.products
    ORDER BY title`
  )
);

const dbGetById = (id) => (
  connection.execute(
    `SELECT id, title, sale_price
    FROM StoreManagerExample.products
    WHERE id=?`, [id]
  )
);

module.exports = {
  dbGetAll,
  dbGetById,
}