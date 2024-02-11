const HttpError = require("../helpers");

const validateData = (schema) => {
  const func = (request, response, next) => {
    const { error } = schema.validate(request.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      next(HttpError(400, `missing required ${fieldName} field`));
    }
    next();
  };
  return func;
};

module.exports = validateData;
