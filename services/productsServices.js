const productsModel = require('../models/productsModel');

const getAll = async () => {
  const [data] = await productsModel.dbGetAll();
  return data;
};

const getById = async (id) => {
  if (isNaN(id)) return { code: 400, message: 'ID must be a number.'};

  const [data] = await productsModel.dbGetById(+id);
  if (!data[0]) return ({ code: 404, message: 'Product not found' });
  return data[0];
};

const queryByTitle = async (q) => {
  if (!q || q === '') return getAll();

  const title = q.toUpperCase();
  const [[data]] = await productsModel.dbQueryByTitle(title);
  if (!data[0]) return getAll();
  return data;
};

const create = async (title, sale_price, active_flag) => {
  const Title = title.toUpperCase();

  const [[data]] = await productsModel.dbCreate(Title, +sale_price, active_flag);
  return data[0];
};

const update = async (id, Title, Sale_price, Active_flag) => {
  const product = await getById(+id);
  if (!product.id) return product; // Id not found

  const title = Title ?? product.title;
  const sale_price = Sale_price ?? product.sale_price;
  const active_flag = Active_flag ?? product.active_flag;

  await productsModel.dbUpdate(id, title.toUpperCase(), +sale_price, active_flag);
  return { id, title, sale_price, active_flag };
};

const drop = async (id) => {
  const product = await getById(+id);
  if (!product.id) return product; // Id not found

  update(+id, undefined, undefined, 0);
  return { id };
};

module.exports = {
  getAll,
  getById,
  queryByTitle,
  create,
  update,
  drop,
};