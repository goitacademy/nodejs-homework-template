const { HttpError } = require("../addoption/");

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) throw HttpError(400, error.message);
  next();
};

module.exports = validateBody;
