const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const keys = Object.keys(req.body);

    const keysLength = keys.length;

    const { error } = schema.validate(req.body);

    if (!keysLength) {
      next(HttpError(400, "Missing fields"));
      return;
    }

    if (error) {
      next(HttpError(400, `${error.message}`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
