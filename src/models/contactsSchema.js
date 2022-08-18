const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/)
    .rule({ message: "phone number must be in format (111) 111-1111" })
    .min(10)
    .max(18)
    .required(),
  favorite: Joi.boolean().default("false"),
});

const putContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/)
    .rule({ message: "phone number must be in format (111) 111-1111" })
    .min(10)
    .max(18)
    .optional(),
});

const patchFavoriteContactSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ "favorite.required": "missing field favorite" }),
});

module.exports = {
  addContactSchema,
  putContactSchema,
  patchFavoriteContactSchema,
};
