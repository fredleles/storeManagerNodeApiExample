const error = {};

const validateTitle = (title, method) => {
  switch (true) {
    case (!title && method === 'POST'):
      error.code = 400;
      error.message = '\'title\' is required.';
      return true;
    case (!title): return false;
    case (title.length < 5):
      error.code = 422;
      error.message = '\'title\' length must be at least 5 characters long';
      return true;

    default:
      return false;
  }
};

const validateSalePrice = (sale_price, method) => {
  switch (true) {
    case (!sale_price && method === 'POST' && sale_price !== 0):
      error.code = 400;
      error.message = '\'sale_price\' is required.';
      return true;
    case (!sale_price && sale_price !== 0): return false;
    case (isNaN(sale_price)):
      error.code = 422;
      error.message = '\'sale_price\' must be a number';
      return true;
    case (sale_price <= 0):
      error.code = 422;
      error.message = '\'sale_price\' must be greater than 0.';
      return true;

    default:
      return false;
  }
};

const validateActiveFlag = (active_flag) => {
  switch (true) {
    case (!active_flag): return false;
    case (!(active_flag === 1)):
      error.code = 422;
      error.message = '\'active_flag\' must be the number 0 or 1.';
      return true;

    default:
      return false;
  }
};

const validate = (req, _res, next) => {
  const { title, sale_price, active_flag } = req.body;

  if (validateTitle(title, req.method)) return next(error);
  if (validateSalePrice(sale_price, req.method)) return next(error);
  if (validateActiveFlag(active_flag)) return next(error);

  next();
};

module.exports = validate;