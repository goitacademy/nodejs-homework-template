const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-z ]+$/),
  
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  
    phone: Joi.string()
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .messages({
        "string.pattern.base":
          "Invalid phone number format. The format should be (XXX) XXX-XXXX.",
      })
      .required(),
  });

  module.exports = contactsSchema;
  
