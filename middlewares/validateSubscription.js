const { HttpError } = require("../helpers");

const validateSubscription = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length < 1) {
    throw HttpError(400, "missing required subscription field");
  }
  const { error } = schema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateSubscription;
