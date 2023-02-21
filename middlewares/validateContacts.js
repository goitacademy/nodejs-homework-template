const { HttpError } = require("../helpers");

const validateContacts = (schema) => (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }
  const { error } = schema.validate(req.body);
  if (error) {
    next(HttpError(400, error.message));
  }
  next();
};

module.exports = validateContacts;
