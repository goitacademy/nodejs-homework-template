import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
    "string.base": "Name must be string",
  }),
  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
    "string.base": "Email must be string",
  }),
  phone: Joi.string()
    .required()
    .pattern(/\([0-9]{3}\) [0-9]{3}-[0-9]{4}/)
    .messages({
      "any.required": "Missing required phone field",
      "string.base": "Phone must be string",
      "string.pattern.base":
        "Does not match the required format: (000) 000-0000",
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "Name must be string",
  }),
  email: Joi.string().messages({
    "string.base": "Email must be string",
  }),
  phone: Joi.string()
    .pattern(/\([0-9]{3}\) [0-9]{3}-[0-9]{4}/)
    .messages({
      "string.base": "Phone must be string",
      "string.pattern.base":
        "Does not match the required format: (000) 000-0000",
    }),
});

export const contactPatchFavorite = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
    "boolean.base": "Favorite must be boolean",
  }),
});
