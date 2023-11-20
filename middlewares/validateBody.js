const { HttpError } = require("../helpers");

const validateBody = (scheme) => {
  const func = (req, res, next) => {
    const { error } = req.body;
    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };
  return func;
};

module.exports = validateBody;
