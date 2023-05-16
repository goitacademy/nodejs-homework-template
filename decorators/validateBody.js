const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
