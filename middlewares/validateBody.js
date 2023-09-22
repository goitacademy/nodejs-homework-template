const { HttpError } = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.vadate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
