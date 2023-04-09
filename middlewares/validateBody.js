const { HttpError } = require("../helpers");

const validateBody = (Schema) => {
  const func = (req, res, next) => {
    const { error } = Schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
