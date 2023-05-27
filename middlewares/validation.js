const HttpError = require("../utils/Errors");
const {
  contactsValidation,
  updateStatusValidation,
} = require("../utils/schema");

const validateContact = (req, res, next) => {
  const { error } = contactsValidation.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  next();
};

const validateUpdateStatus = (req, res, next) => {
  const { error } = updateStatusValidation.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  next();
};

module.exports = { validateContact, validateUpdateStatus };
