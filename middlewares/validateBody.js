const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(
        400,
        `missing required ${error.details[0].context.label} field`
      );
    }
    next();
  };
  return func;
};

module.exports = validateBody;
