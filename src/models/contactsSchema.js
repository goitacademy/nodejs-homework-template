const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/
    )
    .rule({
      message:
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
    })
    .min(10)
    .max(18)
    .required(),
  favorite: Joi.boolean().default("false"),
});

const putContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(
      /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/
    )
    .rule({
      message:
        "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",
    })
    .min(10)
    .max(18)
    .optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const patchFavoriteContactSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ "favorite.required": "missing field favorite" }),
});

const queryContactSchema = Joi.object({
  favorite: Joi.bool()
    .optional()
    .messages({ favorite: "must be true or false" }),
  page: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(0).optional(),
});

const paramsContactSchema = Joi.object({
  contactId: Joi.custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.message("Invalid id");
    }
    return true;
  }),
});

module.exports = {
  addContactSchema,
  putContactSchema,
  patchFavoriteContactSchema,
  paramsContactSchema,
  queryContactSchema,
};
