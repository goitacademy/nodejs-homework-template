const { HttpError } = require("../helpers");
const { schemaUpdateStatusContact } = require("../models/contact");

const validateUpdateStatusContact = (req, res, next) => {
  const { error } = schemaUpdateStatusContact.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = { validateUpdateStatusContact };
