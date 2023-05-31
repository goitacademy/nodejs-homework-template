const { HttpErrors } = require("../helpers");

const validateFavorite = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: `missing field subscription` });
      return;
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpErrors(400, "missing field favorite"));
    }
    next();
  };

  return func;
};

module.exports = validateFavorite;
