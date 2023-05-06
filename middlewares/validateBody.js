const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const validate = (requirement, response, next) => {
    const { error } = schema.validate(requirement.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return validate;
};

module.exports = validateBody;
