const { httpError } = require("../helpers");
const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, "missing required fields"));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
