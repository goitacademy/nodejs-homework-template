const { RequestError } = require("../helpers");

const validBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, "missing required name field"));
    }
    next();
  };

  return func;
};

module.exports = validBody;
