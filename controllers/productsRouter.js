const express = require('express');
const rescue = require('../helpers/rescue');

const productsServices = require('../services/productsServices');

const router = express.Router();
// url/products/

router.get('/', rescue(async (_req, res) => {
  const products = await productsServices.getAll();
  res.status(200).json(products);
}));

router.get('/search', rescue(async (req, res) => {
  const { q } = req.query;
  const products = await productsServices.queryByTitle(q);
  res.status(200).json(products);
}));

router.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await productsServices.getById(id);
  if (response.message) return next(response);
  res.status(200).json(response);
}));

// TODO - Create an Auth middleware
// TODO - Create a middleware to validate the inputs before create and update

router.post('/', rescue(async (req, res) => {
  const { title, sale_price, active_flag = 1 } = req.body;

  const response = await productsServices.create(title, sale_price, active_flag);
  res.status(201).json(response);
}));

router.put('/:id', rescue(async (req, res, next) => {
  const { title, sale_price, active_flag } = req.body;
  const { id } = req.params;
  
  const response = await productsServices.update(id, title, sale_price, active_flag);
  if (response.message) return next(response);
  res.status(200).json(response);
}));

router.delete('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await productsServices.drop(id);
  if (response.message) return next(response);
  res.status(204).send().end();
}));

module.exports = router;
