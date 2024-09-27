const { HttpError } = require("../helpers");

const validateBody = (schem) => {
  const fn = (req, res, next) => {
    const { error } = schem.validate(req.body);
    if (error) {
      next(HttpError(404, error.message));
    }
    next();
  };
  return fn;
};

module.exports = validateBody;
