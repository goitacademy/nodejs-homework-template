const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{0,3}-?[0-9]{7,10}$/)
    // .min(7)
    // .max(15)
    .required(),
});

const editContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(/^\+?[0-9]{0,3}-?[0-9]{7,10}$/),
  // .min(7)
  // .max(15),
}).xor("name", "email", "phone");

module.exports = { addContactSchema, editContactSchema };
