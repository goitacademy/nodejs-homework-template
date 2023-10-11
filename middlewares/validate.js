const HttpError = require("../helpers/HttpError");

const validate = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(
          req.method === "PUT"
            ? "missing fields"
            : error.message.replace(/"/g, ""),
          400
        )
      );
    }
    next();
  };
  return func;
};

module.exports = {
  validate,
};
