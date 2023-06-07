const { ApiError } = require("../utils");

const contactValidation = (schema, message) => (req, _, next) => {
  const { body } = req;
  const { error } = schema.validate(body);

  if (error) next(ApiError(400, message));

  next();
};

module.exports = { contactValidation };
