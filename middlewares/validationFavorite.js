const createError = require("http-errors");

const validationFavorite = (schema) => {
  return (req, res, next) => {
    const { favorite } = req.body;

    if (!favorite) {
      next(createError(400, "missing field favorite"));
    }

    const { error } = schema.validate(req.body);

    if (error) {
      throw createError(400, "missing field favorite");
    }
    next();
  };
};

module.exports = { validationFavorite };
