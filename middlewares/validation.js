const { ApiError } = require("../utils");

const contactValidation = (schema, message) => (req, _, next) => {
  const { body } = req;
  const { error } = schema.validate(body);

  if (error) return next(ApiError(400, message));

  next();
};

module.exports = { contactValidation };
