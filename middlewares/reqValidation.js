const { handleError } = require("../utils");

const reqValidation = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(handleError(400, error.message));
    }

    next();
  };
  return func;
};

module.exports = reqValidation;
