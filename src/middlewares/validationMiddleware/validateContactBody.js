const { httpError } = require("../../helpers");

const validateContactBody = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }

    if (Object.keys(req.body).length === 0)
      return next(httpError(400, "missing fields"));
    next();
  };
};

module.exports = { validateContactBody };
