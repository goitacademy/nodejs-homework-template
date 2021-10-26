const joi = require("joi");

const phonePattern =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

const namePattern = /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/;

const validateContact = (contact, requiredFields = []) => {
  let contactSchema = joi.object({
    name: joi.string().min(3).max(30).pattern(namePattern, "name"),

    email: joi.string().email({ minDomainSegments: 2 }),

    phone: joi.string().pattern(phonePattern, "phone"),
  });

  contactSchema = contactSchema.fork(requiredFields, (field) =>
    field.required()
  );

  return contactSchema.validate(contact);
};

module.exports = validateContact;
