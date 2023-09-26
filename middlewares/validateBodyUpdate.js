const { HttpError } = require("../helpers");

const validateBodyUpdate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(404, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBodyUpdate;
