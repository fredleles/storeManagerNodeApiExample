const express = require('express');
const rescue = require('../helpers/rescue');

const purchaseServices = require('../services/purchaseServices');

const router = express.Router();

router.get('/', rescue(async (_req, res) => {
  const response = await purchaseServices.getAll();
  res.status(200).json(response);
}));

router.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await purchaseServices.getById(id);
  if (response.message) return next(response);
  res.status(200).json(response);
}));

router.post('/', rescue(async (req, res) => {
  const { product_id, quantity, un_cost } = req.body;

  const response = await purchaseServices.create(product_id, quantity, un_cost);
  res.status(201).json(response);
}));

router.put('/:id', rescue(async (req, res, next) => {
  const { product_id, quantity, un_cost } = req.body;
  const { id } = req.params;
  
  const response = await purchaseServices.update(id, product_id, quantity, un_cost);
  if (response.message) return next(response);
  res.status(200).json(response);
}));

module.exports = router;
