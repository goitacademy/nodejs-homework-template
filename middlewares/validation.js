const { HttpError } = require("../helpers");

const validation = (schema) => (req, res, next) => {
  const { body } = req;

  const { error } = schema.validate(body);

  if (error) {
    const err = new HttpError(400, error.message);
    return next(err);
  }

  next();
};

module.exports = validation;
