const rescue = (service) => async (req, res, next) => {
  try {
    const response = await service(req, res, next);
    return response;
  } catch (err) {
    next({ code: 500, message: err.message });
  }
};

module.exports = rescue;