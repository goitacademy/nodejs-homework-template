const { RequestError } = require("../helpers");

const validation = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(RequestError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, error.details[0].message));
    }

    next();
  };
};

module.exports = validation;
