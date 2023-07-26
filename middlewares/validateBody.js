const { generateHTTPError } = require("../helpers");

const validateBody = (schema, message) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(generateHTTPError(400, (message = error.message)));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
