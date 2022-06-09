const Joi = require("joi");

const verifyContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).or("name", "email", "phone");

module.exports = verifyContact;
