const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error && Object.keys(req.body).length > 0) {
      next(RequestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
