const productsModel = require('../models/productsModel');

const getAll = async () => {
  const [data] = await productsModel.dbGetAll();
  return data;
};

const getById = async (id) => {
  if (isNaN(id)) return { code: 400, message: 'Id must be a number.'};

  const [data] = await productsModel.dbGetById(+id);
  if (!data[0]) return ({ code: 404, message: 'Product not found' });
  return data[0];
};

module.exports = {
  getAll,
  getById,
};