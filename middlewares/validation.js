const AddContactSchema = require("../utils/validation/addContactValidationShema");
const UpdateContactSchema = require("../utils/validation/updateContactValidation");

const validateAddContact = (req, res, next) => {
  const validationResult = AddContactSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

const validateUpdateContact = (req, res, next) => {
  const validationResult = UpdateContactSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

module.exports = { validateAddContact, validateUpdateContact };
