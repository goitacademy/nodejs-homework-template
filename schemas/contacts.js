const Joi = require("joi");

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

// Validates sent data for POST method
const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    // .regex(phoneRegex, "Phone number must be in the format (123) 456-7890")
    .required(),
});

// Validates sent data for PUT method
const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string() /**delete this comma, when activate regex 👉*/,
  //   .regex(
  //   phoneRegex,
  //   "Phone number must be in the format (123) 456-7890"
  // ),
});

module.exports = { addContactSchema, updateContactSchema };
