const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (!Object.keys(req.body).length) {
      if (req.method === "PATCH") {
        next(HttpError(400, "missing field favorite"));
      }
      next(HttpError(400, "missing fields"));
    }
    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(", ");
      next(HttpError(400, errorMessages));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
