const { HttpError } = require("../helpers");

const { addContactSchema } = require("../schemas");

const validateBody = (req, res, next) => {
  const newContact = req.body;
  const { error } = addContactSchema.validate(newContact);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateBody;
