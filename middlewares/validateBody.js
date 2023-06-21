const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const name = error.name;
      next(HttpError(400, `missing required ${name} field`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;