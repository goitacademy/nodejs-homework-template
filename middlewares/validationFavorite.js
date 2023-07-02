const { requestError } = require("../utils");

const validationFavorite = (schema) => {
  const func = (req, _, next) => {
    // const body = req.body;
    // const { error } = schema.validate(body);
    const filledBodyFavorite = Object.keys(req.body).length;

    if (!filledBodyFavorite) {
      next(requestError(400, "missing field favorite"));
    }
    next(requestError(400, "favorite must be a boolean"));
  };
  return func;
};

module.exports = validationFavorite;
