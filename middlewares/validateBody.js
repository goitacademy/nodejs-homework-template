const { RequsetError } = require("../helpers/");

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequsetError(400, error.message));
    }
    next();
  };
  return fn;
};

module.exports = validateBody;
