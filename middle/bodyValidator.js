const httpError = require("../helpers/HttpError");

const bodyValidator = (schema) => {
  const valid = async (req, __, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, "missing fields"));
    }
    next();
  };
  return valid;
};

module.exports = bodyValidator;