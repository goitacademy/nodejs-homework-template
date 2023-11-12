const Joi = require("joi");

const validationContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});
const updateContactsSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone");

module.exports = { updateContactsSchema, validationContact };
