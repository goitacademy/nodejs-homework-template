const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "Missing fields"));
    };
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(400, `missing required ${error.details[0].context.key} field`)
      );
    }
    next();
  };
  return func;
};

module.exports = validateBody;
