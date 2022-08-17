const express = require('express');
const rescue = require('../helpers/rescue');

const salesServices = require('../services/salesServices');

const router = express.Router();

router.get('/', rescue(async (_req, res) => {
  const response = await salesServices.getAll();
  res.status(200).json(response);
}));

router.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await salesServices.getById(id);
  if (response.message) return next(response);
  res.status(200).json(response);
}));

router.post('/', rescue(async (req, res) => {
  const sale = req.body;

  const response = await salesServices.create(sale);
  res.status(201).json(response);
}));

router.put('/:id', rescue(async (req, res, next) => {
  const sale = req.body;
  const { id } = req.params;
  
  const response = await salesServices.update(id, sale);
  if (response.message) return next(response);
  res.status(200).json(response);
}));

module.exports = router;
