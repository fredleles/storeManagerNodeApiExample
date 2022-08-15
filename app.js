const express = require('express');
const productsRouter = require('./controllers/productsRouter');
const salesRouter = require('./controllers/salesRouter');
const stockRouter = require('./controllers/stockRouter');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send();
});

app.use('/products', productsRouter);
// app.use('/sales', salesRouter);
// app.use('/stock', stockRouter);

app.all('*', (_req, _res, next) => {
  next({ code: 404, message: 'Bad request' });
});

app.use((err, _req, res, _next) => {
  const { code, message } = err;
  res.status(code).json({ message });
});

module.exports = app;