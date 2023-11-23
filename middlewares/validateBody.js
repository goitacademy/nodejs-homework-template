const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      next(HttpError(400, "missing fields" ));
    }
    const { error } = schema.validate(req.body);
      if (error) {
      const { message } = error.details[0];
      next(HttpError(400, message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
