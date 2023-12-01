const Joi = require("joi");

const joiContactSchema = Joi.object({
  name: Joi.string().messages({
    "any.required": "Name is required",
    "string.empty": "Name is not allowed to be empty",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "Email is required",
      "string.empty": "Email is not allowed to be empty",
    }),
  phone: Joi.string().required().messages({
    "any.required": "Phone is required",
    "string.empty": "Phone is not allowed to be empty",
  }),
  favorite: Joi.boolean().messages({
    "string.empty": "Favorite should be boolean",
  }),
});

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Favorite is required",
    "string.empty": "Favorite should be boolean",
  }),
});

module.exports = { joiContactSchema, joiFavoriteSchema };
