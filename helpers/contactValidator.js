const Joi = require("joi");

// const contactShema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

const postContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a valid string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "missing required email field",
  }),

  phone: Joi.string()
    .required()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.base": "Phone must be a string",
      "string.empty": "Phone cannot be empty",
      "any.required": "missing required phone field",
    }),
});

const putContactSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().email().messages({
    "string.base": "Email must be a valid string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
  }),

  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.base": "Phone must be a string",
      "string.empty": "Phone cannot be empty",
    }),
});

module.exports = {
  postContactSchema,
  putContactSchema,
};
