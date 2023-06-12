const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      throw HttpError(400);
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }

    next(error);
  };
  return fn;
};
module.exports = validateBody;