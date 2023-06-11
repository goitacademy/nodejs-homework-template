const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, `missing ${error.message} field`));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
