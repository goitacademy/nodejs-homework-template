// eslint-disable-next-line no-undef
module.exports = { newContactSchema, existingContactsSchema };
// const Joi = require("joi");

// const newContactSchema = Joi.object({
//   name: Joi.string().required(),
//   phone: Joi.string()
//     .regex(/^[0-9]{10}$/)
//     .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
//     .required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
// });

// const existingContactSchema = Joi.object({
//   name: Joi.string().required(),
//   phone: Joi.string()
//     .regex(/^[0-9]{10}$/)
//     .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
//     .required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
//   id: Joi.string().required(),
// });

// module.exports = { newContactSchema, existingContactSchema };
