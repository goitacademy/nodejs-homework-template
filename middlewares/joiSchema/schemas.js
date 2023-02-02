// const Joi = require("joi");

// const addContactSchema = Joi.object({
//   name: Joi.string()
//   .min(3)
//   .required()
//   .messages({
//     "any.required": "Provide a name",
//   }),
//   phone: Joi.string()
//     .min(10)
//     .max(15)
//     .required()
//     .pattern(
//       /\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
//       "For example (000) 000-0000"
//     )
//     .messages({
//       "any.required": "Provide a phone number",
//     }),
//   email: Joi.string()
//     .email({
//         minDomainSegments: 2,
//         tlds: { allow: ["com"] },
//     })
//     .required()
//     .messages({
//       "any.required": "Provide an email",
//     }),
//   favorite: Joi.boolean().default(false),
// });

// const updateContactSchema = Joi.object({
//   name: Joi.string().min(3).messages({
//     "any.required": "Provide a name",
//   }),
//   phone: Joi.string()
//     .max(15)
//     .pattern(
//       /\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
//       "For example (000) 000-0000"
//     )
//     .messages({
//       "any.required": "Provide a phone number",
//     }),
//   email: Joi.string()
//     .email({
//         minDomainSegments: 2,
//         tlds: { allow: ["com"] },
//     })
//     .messages({
//       "any.required": "Provide an email",
//     }),
//   favorite: Joi.boolean(),
// });

// const updateStatusContactSchema = Joi.object({
//   name: Joi.string().min(3),
//   phone: Joi.string()
//     .max(15)
//     .pattern(
//       /\(?([0-9]{3})\) \/?([0-9]{3})-?([0-9]{4})/,
//       "For example (000) 000-0000"
//     ),
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com"] },
//   }),
//   favorite: Joi.boolean().required(),
// });

// const addUserSchema = Joi.object({
//   email: Joi.string()
//     .required()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     }),
//   password: Joi.string()
//   .min(6).max(10).required().messages({
//     "any.required": "Password is required and must contain 6 to 32 symbols...",
//   }),
//   subscription: Joi.string()
//     .valid("starter", "pro", "business")
//     .default("starter"),
// });

// const findUserSchema = Joi.object({
//   email: Joi.string()
//     .required()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     }),
//   password: Joi.string()
//   .min(6).max(10).required().messages({
//     "any.required": "Password is required and must contain 6 to 32 symbols...",
//   }),
// });

// const updateSubscriptionSchema = Joi.object({
//   subscription: Joi.string().valid("starter", "pro", "business").required(),
// });

// module.exports = {
//   addContactSchema,
//   updateContactSchema,
//   updateStatusContactSchema,
//   addUserSchema,
//   findUserSchema,
//   updateSubscriptionSchema,
// };