const { handleHttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(handleHttpError(400, error.massage));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
