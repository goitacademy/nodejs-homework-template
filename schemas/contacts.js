const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({ "any.required": 'Contact name must be exist!' }).required(),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required().messages({ "any.required": 'Phone number must be exist!' }),
});

module.exports = contactSchema;