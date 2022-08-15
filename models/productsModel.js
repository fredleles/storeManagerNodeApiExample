const connection = require('./dbConfig');

const dbGetAll = async () => (
  connection.execute(
    `SELECT id, title, sale_price
    FROM StoreManagerExample.products
    ORDER BY title`
  )
);

module.exports = {
  dbGetAll,
}