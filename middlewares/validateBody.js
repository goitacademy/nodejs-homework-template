const { RequestError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, "missing required name field"));
    }
    next(error);
  };
  return func;
};
module.exports = validateBody;
