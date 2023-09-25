const HttpError = require("../helperss/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      if (req.method === "PUT") {
        return next(HttpError(400, "missing fields"));
      } else if (req.method === "PATCH") {
        return next(HttpError(400, "missing field favorite"));
      }
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }

    next();
  };
  return func;
};

module.exports = validateBody;
