const { HttpError } = require("../helpers");

const validateBody = (scheme) => {
  const func = (req, res, next) => {
    const { error: err } = scheme.validate(req.body);
    if (err) {
      next(HttpError(400, err.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
