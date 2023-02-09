const joi = require('joi');

const validationFields = {
  contactId: joi.alternatives(joi.number(), joi.string().guid({ version: 'uuidv4' })),
  name: joi.string().min(3).max(30),
  email: joi.string().email(),
  phone: joi.string().pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
};

const contactIdScheme = joi.object({
  contactId: validationFields.contactId.required(),
});

const addContactScheme = joi.object({
  name: validationFields.name.required(),
  email: validationFields.email.required(),
  phone: validationFields.phone.required(),
});

const updateContactScheme = joi
  .object()
  .keys({
    name: validationFields.name.optional(),
    email: validationFields.email.optional(),
    phone: validationFields.phone.optional(),
  })
  .min(1)
  .messages({ 'object.min': 'You need to add at least one field for changing the contact.' });

module.exports = {
  getContactByIdValidation(req, res, next) {
    const validationResult = contactIdScheme.validate(req.params);

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    next();
  },
  addContactValidation(req, res, next) {
    const validationResult = addContactScheme.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    next();
  },
  updateContactValidation(req, res, next) {
    const validationResult = updateContactScheme.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    next();
  },
};
