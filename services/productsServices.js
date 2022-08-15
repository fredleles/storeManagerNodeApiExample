const productsModel = require('../models/productsModel');

const getAll = async () => {
  const [data] = await productsModel.dbGetAll();
  return data;
};

module.exports = {
  getAll,
};