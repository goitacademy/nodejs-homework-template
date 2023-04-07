const { HttpError } = require("../helpers");

const isBody = (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    next(HttpError(400, "Missing fields"));
  }
  next();
};

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorField = error.details[0].context.label;
      const errorMessage = () => {
        switch (req.method) {
          case "POST":
            return `Missing required <${errorField}> field`;
          case "PUT":
            return `Invalid value on <${errorField}> field`;
          default:
        }
      };
      next(HttpError(400, errorMessage()));
    }
    next();
  };
  return func;
};

module.exports = {
  isBody,
  validateBody,
};
