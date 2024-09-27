const { HttpError } = require("../helpers");

const validateBody = (chema) => {
  const func = (req, res, next) => {
    const { error } = chema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
