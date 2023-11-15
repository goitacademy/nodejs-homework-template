const { handleHttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      next(handleHttpError(400, error.massage));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
