const express = require('express');
const rescue = require('../helpers/rescue');

const productsServices = require('../services/productsServices');

const router = express.Router();
// url/products/

router.get('/', rescue(async (_req, res) => {
  const products = await productsServices.getAll();
  res.status(200).json(products);
}));

router.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await productsServices.getById(id);
  if (response.message) return next(response);
  res.status(200).json(response);
}));

module.exports = router;
