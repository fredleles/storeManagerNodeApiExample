const salesModel = require('../models/salesModel');
const productsServices = require('./productsServices');

const getSalesProductsBySaleId = async (sale) => (
  salesModel.getSalesProductsBySaleId(sale.id)
    .then(([response]) => ({
      ...sale,
      products: response,
    }))
);

const getAll = async () => {
  const [sales] = await salesModel.dbGetAll();

  const salesPromises = sales.map((sale) => getSalesProductsBySaleId(sale));
  const response = await Promise.all(salesPromises);
  return response;
};

const getById = async (id) => {
  if (isNaN(id)) return { code: 400, message: 'ID must be a number.'};

  const [data] = await salesModel.dbGetById(+id);
  if (!data[0]) return ({ code: 404, message: 'Sale not found' });

  const response = await getSalesProductsBySaleId(data[0]);
  return response;
};

const calculateTotal = (arrTotals) => {
  const total = arrTotals.reduce(((acc, subtotal) => (acc += subtotal)), 0).toFixed(2);
  return { total };
};

const verifyProducts = (products) => (
  new Promise((resolve, reject) => {
    // Create a new promise for each product inside the array 'sales'

    const productsPromises = products.map(({ product_id, quantity }) => (
      new Promise((iRes, iRej) => {
        productsServices.getById(+product_id)
          .then((response) => {
            if (response.message) iRej(response); // product Id not found
            else iRes(quantity * response.sale_price);
          })
          .catch((err) => reject(err)); // In case there is a internal error
      })
    ));

    Promise.all(productsPromises)
      .then((resp) => resolve(calculateTotal(resp)))
      .catch((resp) => resolve(resp));
  })
);

const create = async (sales) => {
  const { payment_type, products } = sales;
  const response = await verifyProducts(products);

  // If any Id from the products isn't ok, then return.
  if (response.message) return response;

  // Insert sales
  const [[data]] = await salesModel.dbCreateSale(payment_type, response.total);
  const { saleId } = data[0];

  await Promise.all(products.map(({ product_id, quantity }) => (
    salesModel.dbCreateSalesProduct(saleId, product_id, quantity)
  )));
  
  response.id = saleId;
  response.payment_type = payment_type;
  response.products = products;

  return response;
};

const update = async (id, sale) => {
  
};

module.exports = {
  getAll,
  create,
  update,
  getById,
};