const { HttpError } = require("../helpers/HttpError");

const validateBody = (schema) => {
  const body = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return body;
};
module.exports = { validateBody };
