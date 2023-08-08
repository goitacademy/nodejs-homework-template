const Joi = require("joi");


const schemaJoi = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
  
    phone: Joi.string()
      .pattern(/^(?:\+38)?0\d{9}$/)
      .required()
      .messages({
        "string.pattern.base": "Invalid phone number format",
        "any.required": "Phone number is required",
      }),
  
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  module.exports = schemaJoi;