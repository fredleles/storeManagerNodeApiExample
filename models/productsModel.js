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

const dbQueryByTitle = (title) => (
  connection.query(
    'CALL sp_filter_product_by_id(?)',
    [title],
    (error, results) => {
      if (error) throw new Error(error.message);
      return results;
    }
  )
);

module.exports = {
  dbGetAll,
  dbGetById,
  dbQueryByTitle,
}