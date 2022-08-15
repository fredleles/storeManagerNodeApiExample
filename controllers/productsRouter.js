const express = require('express');
const rescue = require('../helpers/rescue');

const productsServices = require('../services/productsServices');

const router = express.Router();
// url/products/

router.get('/', rescue(async (_req, res) => {
  const products = await productsServices.getAll();
  res.status(200).json(products);
}));

module.exports = router;
