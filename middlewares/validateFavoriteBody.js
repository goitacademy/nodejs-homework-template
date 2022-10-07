const { RequestError } = require("../helpers");

const validateFavoriteBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, "missing field favorite"));
    }
    next();
  };

  return func;
};

module.exports = validateFavoriteBody;
