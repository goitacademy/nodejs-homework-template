const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (res, req, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.path)
        .join(", ");
      next(HttpError(400, `missing required ${errorMessage} field`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
