const { HttpError } = require("../helpers");

const validation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const customizedError = error.message.split(" ")[0];
    if (error) {
      next(HttpError(400, `missing required ${customizedError} field`));
    }
    next();
  };
  return func;
};

module.exports = validation;
