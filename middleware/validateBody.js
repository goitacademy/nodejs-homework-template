const { newError } = require("../helpers");

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    next(newError(400, `missing required ${error.message} field`));
  }
  next();
};

module.exports = validateBody;
