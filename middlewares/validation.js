const { createError } = require("../helpers");

const validation = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    next();
  };
  return func;
};

const validationFavorite = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      const newError = createError(400, "missing field favorite");
      return next(newError);
    }
    next();
  };
  return func;
};

module.exports = { validation, validationFavorite };
