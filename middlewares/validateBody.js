const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      Object.keys(req.body).length === 0
        ? next(HttpError(400, "missing fields"))
        : next(
            HttpError(400, `missing required ${error.details[0].path[0]} field`)
          );
    }
    next();
  };

  return func;
};

module.exports = validateBody;
