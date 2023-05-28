// const Joi = require("joi");

// const contactAddSchema = Joi.object({
//   name: Joi.string().trim().min(2).max(50).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string()
//     .pattern(/^\+\d{12}$/)
//     .required(),
//   favorite: Joi.boolean().required(),
// }).options({
//   messages: { "any.required": "missing required {{#label}} field" },
// });

// module.exports = {
//   contactAddSchema,
// };
