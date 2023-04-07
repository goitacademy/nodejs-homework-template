const { HttpError } = require("../helpers");
const { schemaUpdateContact } = require("../models/contact");

const validateUpdateContact = (req, res, next) => {
  const { error } = schemaUpdateContact.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = { validateUpdateContact };
