const purchaseModel = require('../models/purchaseModel');

const getAll = async () => {
  const [data] = await purchaseModel.dbGetAll();
  return data;
};

const getById = async (id) => {
  if (isNaN(id)) return { code: 400, message: 'ID must be a number.'};

  const [data] = await purchaseModel.dbGetById(+id);
  if (!data[0]) return ({ code: 404, message: 'Purchase not found' });
  return data[0];
};

const create = async (product_id, quantity, un_cost) => {
  const [[data]] = await purchaseModel.dbCreate(product_id, quantity, un_cost);
  return data[0];
};

const update = async (id, Product_id, Quantity, Un_cost) => {
  const product = await getById(+id);
  if (!product.id) return product; // Id not found

  const product_id = Product_id ?? product.product_id;
  const quantity = Quantity ?? product.quantity;
  const un_cost = Un_cost ?? product.un_cost;

  await purchaseModel.dbUpdate(id, product_id, quantity, un_cost);
  return { id, product_id, quantity, un_cost };
};

module.exports = {
  getAll,
  create,
  update,
  getById,
};