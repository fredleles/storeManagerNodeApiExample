const express = require('express');
const productsRouter = require('./controllers/productsRouter');
const salesRouter = require('./controllers/salesRouter');
const purchasesRouter = require('./controllers/purchasesRouter');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/purchases', purchasesRouter);

app.all('*', (_req, _res, next) => {
  next({ code: 404, message: 'Bad request' });
});

app.use((err, _req, res, _next) => {
  const { code, message } = err;
  res.status(code).json({ message });
});

module.exports = app;